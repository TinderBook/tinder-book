const User = require('../models/user.model')
const Like = require('../models/like.model')


function findRandomUser() {
    return User.countDocuments({})
        .then(count => {
            const random = Math.floor(Math.random() * count);
            return User.findOne()
                .populate('likedBooks')  
                .skip(random)
                .exec();
        });
}


module.exports.showUsers = (req, res, next) => {
    const numRandomUsers = 10;
    const users = [];

    function addRandomUser() {
        return findRandomUser()
            .then(user => {
                if (!users.some(existingUser => String(existingUser._id) === String(user._id))) {
                    users.push(user);
                    if (users.length < numRandomUsers) {
                        return addRandomUser();  
                    }
                } else {
                    return addRandomUser();  
                }
            });
    }

    addRandomUser()
        .then(() => {
            return Like.find({ fromUser: req.session.userId });
        })
        .then(likes => {
            const likedUserIds = likes.map(like => String(like.toUser));
            users.forEach(user => {
                user.isLiked = likedUserIds.includes(String(user._id));
            });
            res.render('dashboard', { users });
        })
        .catch(error => {
            console.error("Error mostrando usuarios aleatorios:", error);
            next(error);
        });
}
