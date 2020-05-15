var express = require('express');
var router = express.Router();

/**
 * Middlewares & Graphs
 */
var { auth, user, file, item } = require('../controllers');


// Authentication
router.get('/authentication', auth.oauthToken, user.syncUser, auth.generateToken);

// User
router.get('/user', auth.bearerToken, user.getUser);

// Item
router.get('/item', auth.bearerToken, item.getItem);
router.post('/item', auth.bearerToken, item.addItem);
router.put('/item', auth.bearerToken, item.updateItem);
router.delete('/item', auth.bearerToken, item.deleteItem);

// Files
router.get('/file', auth.bearerToken, file.getFile);
router.post('/file/image', auth.bearerToken, file.middelware('image'), file.saveInfo);
router.post('/file/video', auth.bearerToken, file.middelware('video'), file.saveInfo);

/**
 * Module exports
 */
module.exports = router;