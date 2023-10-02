const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')
const excel = require("exceljs");

function createToken(user) {
    const payLoad = {
        _id: user._id,
        role: user.role.name,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.encode(payLoad, config.SECRET_TOKEN)
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            if (payload.exp < moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha espirado'
                })
            }

            resolve(payload)
        } catch (err) {
            reject({
                status: 500,
                message: 'invalid token'
            })
        }
    })
    return decoded
}

async function generateExcel(title, columns, rows, res) {
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet(title);

    worksheet.columns = columns;
    worksheet.addRows(rows);

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + title + ".xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
    });
}

module.exports = { createToken, decodeToken, generateExcel }