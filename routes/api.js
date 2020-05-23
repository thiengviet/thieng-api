var express = require('express');
var router = express.Router();

/**
 * Middlewares & Graphs
 */
var {
  auth, user, file, item,
  blueprint,
} = require('../controllers');


// Authentication (core)
router.get('/authentication', auth.oauthToken, user.syncUser, auth.generateToken);

// User (core)
router.get('/user', auth.bearerToken, user.getUser);

// Item (core)
router.get('/item', auth.bearerToken, item.getItem);
router.post('/item', auth.bearerToken, item.addItem);
router.put('/item', auth.bearerToken, item.updateItem);
router.delete('/item', auth.bearerToken, item.deleteItem);
// Item (advance)
router.get('/social/items', item.getItems);

// Blueprint (core)
router.get('/blueprint', auth.bearerToken, blueprint.getBlueprint);
router.post('/blueprint', auth.bearerToken, blueprint.addBlueprint);
router.put('/blueprint', auth.bearerToken, blueprint.updateBlueprint);
router.delete('/blueprint', auth.bearerToken, blueprint.deleteBlueprint);
// Blueprint (advance)
router.get('/social/blueprint', blueprint.getBlueprint);

// Files (core)
router.get('/file', auth.bearerToken, file.getFile);
router.post('/file/image', auth.bearerToken, file.middelware('image'), file.saveInfo);
router.post('/file/video', auth.bearerToken, file.middelware('video'), file.saveInfo);

/**
 * Module exports
 */
module.exports = router;