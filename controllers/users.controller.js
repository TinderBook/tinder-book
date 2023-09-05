const User = require('../models/user.model');
const mongoose = require("mongoose");
const Book = require("../models/book.model");

module.exports.register = (req, res, next) => {
    Book.find()
        .then((books) => res.render('users/register', { books }))
        .catch((error) => next(error))

}

module.exports.doRegister = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                return Book.find()
                    .then((books) => {
                        res.render('users/register', {
                            user: req.body,
                            books: books,
                            errors: {
                                username: 'Username already exists',
                            }
                        })

                    })
            } else {
                return User.create(req.body)
                    .then(() => {
                        res.redirect('/login')
                    })
            }
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {

                Book.find()
                    .then((books) => {
                        res.render('users/register', {
                            user: req.body,
                            books: books,
                            errors: error.errors
                        })
                    })
                    .catch((error) => next(error));
            } else {
                next(error)
            }
        })
}

module.exports.login = (req, res, next) => {
    res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {

    function renderInvalidUsername() {
        res.render('users/login', {
            user: req.body,
            errors: {
                password: 'Invalid username or password'
            }
        })
    }

    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                return user.checkPassword(req.body.password)
                    .then((match) => {
                        if (match) {
                            req.session.userId = user.id;
                            res.redirect('/profile')
                        } else {
                            renderInvalidUsername();
                        }
                    })
            } else {
                renderInvalidUsername();
            }
        })
        .catch((error) => next(error));
}


module.exports.profile = (req, res, next) => {
    User.findById(req.user)
        .then()
        .catch()
    res.render('users/profile', { user: req.user })
}


module.exports.likeUser = (req, res, next) => {
    const userId = req.user._id;
    const likedUserId = req.params.id;

    // Añadir el usuario al que se da "like" a la lista de "likesGiven" del usuario actual
    User.findByIdAndUpdate(userId, { $addToSet: { likesGiven: likedUserId } }, { new: true })
        .then(user => {
            // Verificar si hay un "match"
            if (user.likesReceived.includes(likedUserId)) {
                console.log("It's a match!");
            }
            // Añadir el usuario actual a la lista de "likesReceived" del usuario al que se da "like"
            return User.findByIdAndUpdate(likedUserId, { $addToSet: { likesReceived: userId } }, { new: true });
        })
        .then(() => res.redirect('/users')) // por ejemplo
}

module.exports.edit = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        description: req.body.description,
    }, { new: true })
    .then(() => {
        res.redirect('/profile')
    })
    .catch((error) => next(error))
}
