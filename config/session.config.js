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