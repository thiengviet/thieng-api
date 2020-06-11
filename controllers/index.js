var auth = require('./auth.controller');
var user = require('./user.controller');
var file = require('./file.controller');
var item = require('./item.controller');
var project = require('./project.controller');
var cart = require('./cart.controller');
var recommendation = require('./recommendation.controller');

module.exports = {
  auth,
  user,
  file,
  item,
  project,
  cart,
  recommendation,
}