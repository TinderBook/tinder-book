const User = require('../models/user.model')

module.exports.showUsers = (req, res, next) => {

    User.find()
        .populate('likedBooks')
        .then((users) => {
            res.render('dashboard', {users: users})
        })
        .catch((error) => next(error))
}