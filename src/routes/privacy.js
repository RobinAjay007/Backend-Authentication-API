const express = require('express');
const router = express.Router();
const passport = require('passport');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/auth');


//router.get('/getpublicprofile', authMiddleware.authenticateToken, profileController.getAllPublicProfiles);
router.get('/profiles/public', profileController.getPublicProfiles);
module.exports = router