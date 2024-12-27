const UserController = require('../Controllers/UserController')
const authenticate = require('../Middlewares/AuthMiddleware')

const router = require('express').Router()
// user-profile-router
router.get('/user-info',authenticate,UserController.getUserInfo)


// user-post-router
router.get('/posts/all',authenticate,UserController.getAllPosts)
router.post('/posts/add',authenticate,UserController.addNewPost)




module.exports = router