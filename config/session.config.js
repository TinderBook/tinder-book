const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const User = require('../models/user.model')

module.exports.session = expressSession({
    secret: process.env.SESSION_SECRET || 'super-secret (change it)',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoose.connection._connectionString,
        ttl: 14 * 24 * 60 * 60 // 14 days expiration
    }),
    cookie: {
        httpOnly: true,
        secure: process.env.SESSION_SECRET === 'true',
    }
})

module.exports.loadSessionUser = (req, res, next) => {
    const userId = req.session.userId;
    if(userId){
        User.findById(userId)
        .populate('likedBooks')
        .then((user) => {
            req.user = user;
            res.locals.currentUser = user;
           
            next();
        })
        .catch((error) => next(error));
    } else {
        next();
    }    
}