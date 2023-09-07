const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid')

const users = require('../controllers/users.controller')
const likes = require('../controllers/likes.controller')    

const dashboard = require('../controllers/dashboard.controller')

//users CRUD
router.get('/register', users.register)
router.post('/register', users.doRegister)
router.get('/login', users.login)
router.post('/login', users.doLogin)
router.get('/user/profile', secure.isAuthenticated, users.profile)
router.post('/user/:id/edit', secure.isAuthenticated, users.editDescription)
router.get('/user/:id/editProfile', secure.isAuthenticated, users.editProfile)
router.post('/user/:id/editProfile', secure.isAuthenticated, users.doEditProfile )
router.post('/logout', secure.isAuthenticated, users.logout)
// router.get('/recivedmaches', secure.isAuthenticated, users.recivedMaches) 

// GET /matches -> le da todos los matches donde el req.user sea from o to
// GET matches/<id_match>/messages -> lista los mensajes de ese match
// POST /matches/<id_match>/messages -> crea mensaje en el match
// Message
// text:^String
// from:^User
// match:^Match


//like ROUTE
router.post('/like/:id',likes.likeUser)

//home views
router.get('/dashboard', secure.isAuthenticated, dashboard.showUsers);
router.get('/', (req, res, next) => res.render('landing'))

module.exports = router;