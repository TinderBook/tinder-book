const Match = require('../models/match.model');

module.exports = {
    viewMyMatches: (req, res, next) => {
        const userId = req.user.id;
        Match.find({ $or: [{ user1: userId }, { user2: userId }] })
            .populate('user1 user2')
            .then(matches => {
                const matchedUsers = matches.map(match => {
                    let user = match.user1._id.toString() === userId ? match.user2 : match.user1;
                    return {
                        user: user,
                        matchId: match._id.toString()
                    }
                });
                res.render('users/my-matches', { matches: matchedUsers });
            })
            .catch(err => next(err));
    },

    matchDetails: (req, res, next) => {
        Match.findById(req.params.id)
            .populate('user1')
            .populate('user2')
            .populate({
                path: 'messages',
                populate: {
                    path: 'sender',
                    model: 'User'
                }
            })
            .then(match => {
                let otherUser = match.user1._id.toString() === req.session.userId ? match.user2 : match.user1;
                
                // Update the match notified status to true
                if (!match.notified) {
                    match.notified = true;
                    return match.save()
                        .then(() => {
                            res.render("matches/details", { match, otherUser });
                        });
                } else {
                    res.render("matches/details", { match, otherUser });
                }
            })
            .catch(err => next(err));
    }
}
