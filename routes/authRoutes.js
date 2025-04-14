const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController')



router.get('/signup', authController.signUpGet);
router.post('/signup', authController.signUpPost);
router.get('/login', authController.loginGet);
router.post('/login', authController.loginPost);
router.get('/logout', authController.logoutGet);

module.exports = router;