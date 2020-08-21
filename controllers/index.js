var auth = require('./auth.controller');
var user = require('./user.controller');
var file = require('./file.controller');
var item = require('./item.controller');
var project = require('./project.controller');
var order = require('./order.controller');
var recommendation = require('./recommendation.controller');
var comment = require('./comment.controller');
var feeling = require('./feeling.controller');
var stat = require('./stat.controller');

module.exports = {
  auth,
  user,
  file,
  item,
  project,
  order,
  recommendation,
  comment,
  feeling,
  stat,
}