var express = require('express');
var router = express.Router();

/**
 * Middlewares & Graphs
 */
var { auth, user, uploader } = require('../controllers');


// Authentication
router.get('/authentication', auth.oauthToken, user.syncUser, auth.generateToken);

// User
router.get('/user', auth.oauthToken, user.getUser);

// Uploader
router.post('/upload/image', uploader.middelware('image'), uploader.uploadImage);

/**
 * Module exports
 */
module.exports = router;