const Match = require('../models/match.model');
const User = require('../models/user.model');
const Like = require('../models/like.model');

const checkMutualLikes = (userIdA, userIdB) => {
    return new Promise((resolve, reject) => {
        Like.findOne({ fromUser: userIdA, toUser: userIdB })
            .then(likeFromAToB => {
                if (!likeFromAToB) {
                    reject('User A has not liked User B');
                    return;
                }
                return Like.findOne({ fromUser: userIdB, toUser: userIdA });
            })
            .then(likeFromBToA => {
                if (likeFromBToA) {
                    resolve(true);
                } else {
                    reject('User B has not liked User A');
                }
            })
            .catch(err => reject(err));
    });
}


module.exports = {

    checkMutualLikesMiddleware: (req, res, next) => {
        const userIdA = req.session.userId;
        const userIdB = req.params.id;

        checkMutualLikes(userIdA, userIdB)
            .then(() => {
                next();
            })
            .catch(err => res.status(400).send(err));
    },

    matches: (req, res, next) => {
        const userId = req.session.userId;
        Match.find({ $or: [{ user1: userId }, { user2: userId }] })
            .populate('user1')
            .populate('user2')
            .then(matches => {
                res.render('matches', { matches });
            })
            .catch(err => next(err));
    },


}

