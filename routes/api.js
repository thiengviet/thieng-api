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
router.get('/user', auth.oauthToken, user.getUser);

/**
 * Module exports
 */
module.exports = router;