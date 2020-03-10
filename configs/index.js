var env = process.env.NODE_ENV;

var server = require('./server.config');
var db = require('./db.config');
var auth = require('./auth.config');

/**
 * Module exports
 */
module.exports = {
  server: server[env],
  db: db[env],
  auth: auth[env],
};
