const Message = require('../models/message.model');
const Match = require('../models/match.model');

module.exports.notifications = (req, res, next) => {
    if (!req.user) {
        return next();
    }

    Promise.all([
        Message.countDocuments({ receiver: req.user._id, read: false }),
        Match.countDocuments({ $or: [{ user1: req.user._id }, { user2: req.user._id }],
            notified: false })
    ])
        .then(([unreadMessages, unnotifiedMatches]) => {
            res.locals.unreadMessages = unreadMessages > 0;
            res.locals.unreadMessagesCount = unreadMessages;

            res.locals.unnotifiedMatches = unnotifiedMatches > 0;
            res.locals.unnotifiedMatchesCount = unnotifiedMatches;

            next();
        })
        .catch(err => next(err));
}

