const User = require('../models/user.model')
const Like = require('../models/like.model')

module.exports.showUsers = (req, res, next) => {

    User.find()
        .populate('likedBooks')
        .then(users => {
            return Like.find({ fromUser: req.session.userId })
            .then(likes => {
                const likedUserIds = likes.map(like => String(like.toUser));
                users.forEach(user => {
                    user.isLiked = likedUserIds.includes(String(user._id));
                })
                res.render('dashboard', {users})
            })
        })
        .catch((error) => next(error))
        
}