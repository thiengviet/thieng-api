var express = require('express');
var router = express.Router();

/**
 * Controllers
 */
var controllers = require('../controllers');
var { auth, user } = controllers;

// Authentication
router.get('/authentication', auth.oauthToken, auth.generateToken);

// User
router.get('/user', auth.bearerToken, user.getUser);
router.put('/user', auth.bearerToken, user.syncUser);

/**
 * Module exports
 */
module.exports = router;