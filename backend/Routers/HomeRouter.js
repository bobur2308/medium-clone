const HomeController = require('../Controllers/HomeController')
const authenticate = require('../Middlewares/AuthMiddleware')

const router = require('express').Router()

router.get('/users',HomeController.getAllUsers)
router.get('/users/:id',HomeController.getUserById)

router.get('/posts',HomeController.getAllPosts)
router.get('/posts/:id',HomeController.getPostById)

module.exports = router