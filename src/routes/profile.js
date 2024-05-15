const express = require('express');
const router = express.Router();
const passport = require('passport');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/auth');

router.get('/getprofile', authMiddleware.authenticateToken, profileController.getProfile);
router.put('/editprofile', authMiddleware.authenticateToken, profileController.editProfile);
router.post('/upload/photo', profileController.upload.single("images"),profileController.uploadPhoto);
router.put('/photo/:id',profileController.upload.single("images"),profileController.updateImage);



module.exports = router;
