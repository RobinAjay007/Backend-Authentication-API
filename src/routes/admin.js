const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth');

router.get('/profiles',authMiddleware.authenticateToken, authMiddleware.isAdmin, adminController.getAllProfiles);

module.exports = router;
