var express = require('express');
var router = express.Router();

/**
 * Middlewares & Graphs
 */
var GraphQL = require('../graphql');
var { auth, user } = require('../controllers');


// Authentication
router.get('/authentication', auth.oauthToken, user.syncUser, auth.generateToken);

// GraphQL
router.use('/graphql', auth.bearerToken, GraphQL);


/**
 * Module exports
 */
module.exports = router;