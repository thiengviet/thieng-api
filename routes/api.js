var express = require('express');
var router = express.Router();

/**
 * Middlewares & Graphs
 */
var {
  auth, user, file, item,
  project,
} = require('../controllers');


// Authentication (core)
router.get('/authentication', auth.oauthToken, user.syncUser, auth.generateToken);

// User (core)
router.get('/user', auth.bearerToken(true), user.getUser);
// User (advance)
router.get('/social/users', user.getUsers);

// Item (core)
router.get('/item', auth.bearerToken(true), item.getItem);
router.post('/item', auth.bearerToken(false), item.addItem);
router.put('/item', auth.bearerToken(false), item.updateItem);
router.delete('/item', auth.bearerToken(false), item.deleteItem);
// Item (advance)
router.get('/social/items', item.getItems);

// Project (core)
router.get('/project', auth.bearerToken(true), project.getProject);
router.post('/project', auth.bearerToken(false), project.addProject);
router.put('/project', auth.bearerToken(false), project.updateProject);
router.delete('/project', auth.bearerToken(false), project.deleteProject);
// Project (advance)
router.get('/social/project', project.getProject);
router.get('/social/projects', project.getProjects);

// Files (core)
router.get('/file', auth.bearerToken(true), file.getFile);
router.post('/file/image', auth.bearerToken(false), file.middelware('image'), file.saveInfo);
router.post('/file/video', auth.bearerToken(false), file.middelware('video'), file.saveInfo);

/**
 * Module exports
 */
module.exports = router;