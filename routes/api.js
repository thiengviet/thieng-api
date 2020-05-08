var express = require('express');
var router = express.Router();

/**
 * Middlewares & Graphs
 */
var { auth, user, uploader } = require('../controllers');


// Authentication
router.get('/authentication', auth.oauthToken, user.syncUser, auth.generateToken);

// User
router.get('/user', auth.bearerToken, user.getUser);

// Uploader
router.post('/upload/image', auth.bearerToken, uploader.middelware('image'), uploader.saveInfo);
router.post('/upload/video', auth.bearerToken, uploader.middelware('video'), uploader.saveInfo);

/**
 * Module exports
 */
module.exports = router;