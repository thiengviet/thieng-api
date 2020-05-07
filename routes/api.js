var express = require('express');
var router = express.Router();

/**
 * Middlewares & Graphs
 */
var { auth, user } = require('../controllers');


// Authentication
router.get('/authentication', auth.oauthToken, user.syncUser, auth.generateToken);

// User
router.get('/user', auth.oauthToken, user.getUser);

/**
 * Module exports
 */
module.exports = router;