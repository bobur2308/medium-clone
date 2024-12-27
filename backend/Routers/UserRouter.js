const UserController = require('../Controllers/UserController')
const authenticate = require('../Middlewares/AuthMiddleware')

const router = require('express').Router()

router.get('/user-info',authenticate,UserController.getUserInfo)
router.get('/posts/all',authenticate,UserController.getAllPosts)

module.exports = router