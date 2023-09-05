const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid')

const users = require('../controllers/users.controller')

const dashboard = require('../controllers/dashboard.controller')

//users CRUD
router.get('/register', users.register)
router.post('/register', users.doRegister)
router.get('/login', users.login)
router.post('/login', users.doLogin)
router.get('/profile', secure.isAuthenticated, users.profile)
router.post('/user/:id/edit', secure.isAuthenticated, users.edit)
router.get('/user/:id/editProfile', secure.isAuthenticated, users.editProfile) 

//like ROUTE
router.post('/users/:id/like' , users.likeUser)

//Books CRUD

//home views
router.get('/dashboard', secure.isAuthenticated, dashboard.showUsers);

router.get('/', (req, res, next) => res.render('landing'))

module.exports = router;