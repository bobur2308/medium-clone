const UserController = require('../Controllers/UserController')
const authenticate = require('../Middlewares/AuthMiddleware')

const router = require('express').Router()
// user-profile-router
router.get('/user-info',authenticate,UserController.getUserInfo)


// user-post-router
router.get('/posts/all',authenticate,UserController.getAllPosts)
router.post('/posts/add',authenticate,UserController.addNewPost)
router.put('/posts/edit/:id',authenticate,UserController.editPostById)
router.delete('/posts/delete/:id',authenticate,UserController.deletePostById)

module.exports = router