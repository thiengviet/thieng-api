var express = require('express');
var router = express.Router();

/**
 * Middlewares & Graphs
 */
var { AuthMiddleware, UserMiddleware } = require('../middlewares');
var { UserGraph } = require('../graphs');



// Authentication
router.get('/authentication', AuthMiddleware.oauthToken, UserMiddleware.syncUser, AuthMiddleware.generateToken);

// User
router.use('/user', AuthMiddleware.bearerToken, UserGraph);


/**
 * Module exports
 */
module.exports = router;