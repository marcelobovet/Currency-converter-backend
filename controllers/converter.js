const axios = require('axios')
const Transaction = require('../models/transaction')
const moment = require('moment')
const { generateExcel } = require('../services')

async function converter(req, res) {
    try {
        const fecha = req.body.fecha //DD-MM-YYYY
        const uf = req.body.uf

        const { data } = await axios.get(`https://mindicador.cl/api/uf/${fecha}`)
        const valor = data.serie[0].valor

        const conversion = uf * valor
        const transaction = new Transaction({
            user: req.user._id,
            origin_amount: uf,
            convertion_date: fecha,
            clp_amount: valor,
            convertion_amount: conversion.toFixed(0)
        })

        const savedTransaction = await transaction.save()

        return res.status(200).send(savedTransaction)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err })
    }
}

async function getAll(req, res) {
    try {
        const transactions = await Transaction.find().populate('user');
        if (!transactions.length) return res.status(404).send({ message: 'no existen transacciones' })

        return res.status(200).send(transactions);
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err })
    }
}

async function getExcel(req, res) {
    try {
        const transactions = await Transaction.find().populate('user');
        if (!transactions.length) return res.status(404).send({ message: 'no existen transacciones' })

        let columns = [
            { header: "Fecha", key: "date", width: 20 },
            { header: "Usuario", key: "user_name", width: 20 },
            { header: "Monto origen (UF)", key: "origin_amount", width: 20 },
            { header: "Fecha Conversion", key: "convertion_date", width: 20 },
            { header: "Valor Moneda (CLP)", key: "clp_amount", width: 20 },
            { header: "Valor Conversion (CLP)", key: "convertion_amount", width: 20 },
        ]

        let arr_data = transactions.map((trans) => {
            return {
                origin_amount: trans.origin_amount,
                convertion_date: trans.convertion_date,
                clp_amount: "$" + trans.clp_amount,
                convertion_amount: "$" + trans.convertion_amount,
                date: trans.createdAt,
                user_name: trans.user.name,
            }
        })

        await generateExcel("transacciones", columns, arr_data, res)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err })
    }
}


async function getResumeToday(req, res) {
    try {
        const fecha = moment().format('DD-MM-YYYY')

        const { data } = await axios.get(`https://mindicador.cl/api/uf/${fecha}`)
        const valor = data.serie[0].valor

        const response = {
            convertion_date: fecha,
            clp_amount: valor,
        }

        return res.status(200).send(response)
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err })
    }
}

module.exports = { converter, getAll, getExcel, getResumeToday }