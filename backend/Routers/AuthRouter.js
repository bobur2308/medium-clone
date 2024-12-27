const AuthController = require('../Controllers/AuthController');

const router = require('express').Router();

router.post('/register',AuthController.registerUser )
router.post('/login',AuthController.loginUser )
router.post('/refresh',AuthController.refreshToken )
router.post('/logout',AuthController.logOut )

module.exports = router;