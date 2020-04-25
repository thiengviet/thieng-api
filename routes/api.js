var express = require('express');
var router = express.Router();

/**
 * Controllers & Graphs
 */
var { auth, user } = require('../controllers');
var { HeroGraph } = require('../graphs');



// Authentication
router.get('/authentication', auth.oauthToken, user.syncUser, auth.generateToken);

// User
router.get('/user', auth.bearerToken, user.getUser);

// Hero
router.use('/hero', (req, res, next) => {
  req.auth = {
    email: 'tphanson@gmail.com',
    token: '1234567'
  }
  return next();
}, HeroGraph);

/**
 * Module exports
 */
module.exports = router;