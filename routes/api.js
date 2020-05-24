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
router.get('/user', auth.bearerToken, user.getUser);
// User (advance)
router.get('/social/users', user.getUsers);

// Item (core)
router.get('/item', auth.bearerToken, item.getItem);
router.post('/item', auth.bearerToken, item.addItem);
router.put('/item', auth.bearerToken, item.updateItem);
router.delete('/item', auth.bearerToken, item.deleteItem);
// Item (advance)
router.get('/social/items', item.getItems);

// Project (core)
router.get('/project', auth.bearerToken, project.getProject);
router.post('/project', auth.bearerToken, project.addProject);
router.put('/project', auth.bearerToken, project.updateProject);
router.delete('/project', auth.bearerToken, project.deleteProject);
// Project (advance)
router.get('/social/project', project.getProject);
router.get('/social/projects', project.getProjects);

// Files (core)
router.get('/file', auth.bearerToken, file.getFile);
router.post('/file/image', auth.bearerToken, file.middelware('image'), file.saveInfo);
router.post('/file/video', auth.bearerToken, file.middelware('video'), file.saveInfo);

/**
 * Module exports
 */
module.exports = router;