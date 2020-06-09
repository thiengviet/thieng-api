var utils = require('./utils');

/**
 * Constructor
 */
var middlewares = {}

middlewares.filterBody = function (req, res, next) {
  if (!req.body) return next();
  let body = { ...req.body };
  let keys = Object.keys(body);
  keys.forEach(key => {
    if (req.method == 'POST') delete body[key]._id;
    delete body[key].__v;
    delete body[key].createdAt;
    delete body[key].updatedAt;
  });
  req.body = body;
  return next();
}

middlewares.parseParams = function (req, res, next) {
  if (!req.query) return next();
  let params = JSON.stringify(req.query);
  req.query = utils.deepParseJSON(params);
  return next()
}

module.exports = middlewares;