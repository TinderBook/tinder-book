const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid')

const users = require('../controllers/users.controller')
const likes = require('../controllers/likes.controller') 
const messages = require('../controllers/messages.controllers') 
const matchController = require('../controllers/match.controller')

//multer-cloudinary
const upload = require('./multer.config')

const dashboard = require('../controllers/dashboard.controller')

//users CRUD
router.get('/register', users.register)
router.post('/register', users.doRegister)
router.get('/login', users.login)
router.post('/login', users.doLogin)
router.get('/user/profile', secure.isAuthenticated, users.profile)
router.post('/user/:id/edit', secure.isAuthenticated, users.editDescription)
router.get('/user/:id/editProfile', secure.isAuthenticated, users.editProfile)
router.post('/user/:id/editProfile', secure.isAuthenticated,upload.single('image'), users.doEditProfile )
router.post('/logout', secure.isAuthenticated, users.logout)

//like ROUTE
router.post('/like/:id',likes.likeUser)

//matches ROUTE
router.get('/users/my-matches', secure.isAuthenticated, matchController.viewMyMatches)

//like ROUTE
router.post('/like/:id',likes.likeUser)

//My-matches
router.get('/users/my-matches', secure.isAuthenticated, matchController.viewMyMatches)
router.get('/match/:id', secure.isAuthenticated, matchController.matchDetails)

//messages ROUTE
router.post('/matches/:id/messages', secure.isAuthenticated, messages.doCreate)

//home views
router.get('/dashboard', secure.isAuthenticated, dashboard.showUsers);
router.get('/', (req, res, next) => res.render('landing'))

module.exports = router;