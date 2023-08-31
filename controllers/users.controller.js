const User = require('../models/user.model');


module.exports.register = (req, res, next) => res.render('users/register')

module.exports.doRegister = (req, res, next) => {
    res.redirect('/login')
}

module.exports.login = (req, res, next) => {
    res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {
    req.res('dashboard')
}