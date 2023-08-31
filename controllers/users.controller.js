const User = require('../models/user.model');
const mongoose = require("mongoose");


module.exports.register = (req, res, next) => res.render('users/register')

module.exports.doRegister = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                res.render('users/register', {
                    user: req.body,
                    errors: {
                        username: 'Username already exists'
                    }
                })
            } else {
                return User.create(req.body)
                    .then(() => {
                        res.redirect('/login')
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('users/register' )
            } else {
                next(error);
            }
        })

}

module.exports.login = (req, res, next) => {
    res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {
    req.res('dashboard')
}