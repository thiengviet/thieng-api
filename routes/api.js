var express = require('express');
var router = express.Router();


/**
 * Controllers
 */
var controllers = require('../controllers');
var { } = controllers;

// User
router.get('/user', (req, res, next) => {
  res.send({ status: 'OK', data: 'Hello worl' });
});

/**
 * Module exports
 */
module.exports = router;