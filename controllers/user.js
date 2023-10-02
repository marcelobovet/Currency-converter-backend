const mongoose = require("mongoose");
const service = require("../services/index");
const Role = require("../models/role");
const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");

async function signUp(req, res) {
    try {
        const userRole = await Role.findOne({ name: "user" });

        const user = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            role: userRole._id,
        });

        await user.save();
        return res.status(200).send({ message: "Usuario creado exitosamente" });

    } catch (err) {
        if (err)
            res.status(500).send({ message: `Error al crear un usuario: ${err}` });
    }
}

async function signIn(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email }).populate('role')
        if (!user) return res.status(404).send({ message: "No existe el usuario" });
        console.log(user)
        const plainPass = req.body.password
        const passwordPass = bcrypt.compareSync(plainPass, user.password)
        if (!passwordPass) return res.status(400).send({ message: "contraseña incorrecta" })
        return res.status(200).send({
            message: "Te has logeado correctamente",
            token: service.createToken(user),
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err })
    }
}

async function getMe(req, res) {
    try {
        const user = await User.findById(req.user._id).populate('role').select('-password');
        if (!user) return res.status(404).send({ message: 'Usuario no existe' })

        return res.status(200).send(user);

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err })
    }
}

module.exports = {
    signIn,
    signUp,
    getMe
};
