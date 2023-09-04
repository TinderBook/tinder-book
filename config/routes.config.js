const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller')

//users CRUD
router.get('/register', users.register)
router.post('/register', users.doRegister)
router.get('/login', users.login)
router.post('/login', users.doLogin)
router.get('/profile', users.profile)

//like ROUTE
router.post('/users/:id/like' , users.likeUser)

//Books CRUD



router.get('/', (req, res, next) => res.render('landing'))

module.exports = router;