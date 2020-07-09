var express = require('express');
var router = express.Router();

/**
 * Middlewares & Graphs
 */
var {
  auth, user, file, item,
  project, order, recommendation,
} = require('../controllers');


// Authentication (core)
router.get('/authentication', auth.oauthToken, user.syncUser, auth.generateToken);

// User (core)
router.get('/user', auth.bearerToken(true), user.getUser);
router.put('/user', auth.bearerToken(false), user.updateUser);
// User (advance)
router.get('/public/users', user.getUsers);

// Item (core)
router.get('/item', auth.bearerToken(true), item.getItem);
router.post('/item', auth.bearerToken(false), item.addItem);
router.put('/item', auth.bearerToken(false), item.updateItem);
router.delete('/item', auth.bearerToken(false), item.deleteItem);
// Item (advance)
router.get('/public/items', item.getItems);

// Order
router.get('/order', auth.bearerToken(false), order.getOrder);
router.post('/order', auth.bearerToken(false), order.addOrder);
router.put('/order', auth.bearerToken(false), order.updateOrder);
router.delete('/order', auth.bearerToken(false), order.deleteOrder);
// Order (advance)
router.get('/private/orders', auth.bearerToken(false), order.getOrders);
router.get('/private/my-orders', auth.bearerToken(false), order.getMyOrders);
router.put('/private/order/status', auth.bearerToken(false), order.updateOrderStatus);

// Project (core)
router.get('/project', auth.bearerToken(true), project.getProject);
router.post('/project', auth.bearerToken(false), project.addProject);
router.put('/project', auth.bearerToken(false), project.updateProject);
router.delete('/project', auth.bearerToken(false), project.deleteProject);
// Project (advance)
router.get('/public/project', project.getProject);
router.get('/public/projects', project.getProjects);

// Files (core)
router.get('/file', auth.bearerToken(true), file.getFile);
router.post('/file/image', auth.bearerToken(false), file.middelware('image'), file.addFile);
router.post('/file/video', auth.bearerToken(false), file.middelware('video'), file.addFile);
router.put('/file', auth.bearerToken(false), file.updateFile);
router.delete('/file', auth.bearerToken(false), file.deleteFile);

// Recommendation (core)
router.get('/recommendation/items', recommendation.recommendItems);

/**
 * Module exports
 */
module.exports = router;