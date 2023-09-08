const Match = require('../models/match.model');
const User = require('../models/user.model');
const Like = require('../models/like.model');



module.exports = {

  
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

    viewMyMatches: (req, res, next) => {
        const userId = req.session.userId;
        Match.find({ $or: [{ user1: userId}, { user2: userId }] })
            .populate('user1 user2')
            .then(matches => {
                const matchedUsers = matches.map(match => {
                    return match.user1._id.toString() === userId ? match.user2 : match.user1;
                });
                res.render('users/my-matches', { users: matchedUsers });
            })
            .catch(err => next(err));    
    }
    

}

