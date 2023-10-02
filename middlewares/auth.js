const services = require('../services')

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: " No tienes autorizacion" })
    }

    const token = req.headers.authorization.split(" ")[1]

    services.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status)
        })
}

function hasRoles(roles) {
    return function (req, res, next) {
        let hasRole = false;

        if (roles.includes(req.user.role)) {
            hasRole = true;
        }

        if (!hasRole) return res.status(401).send({ Error: 'Unauthorized user' });
        next();
    }
}


module.exports = { isAuth, hasRoles };