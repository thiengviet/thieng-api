var env = process.env.NODE_ENV;

var server = require('./server.config');
var db = require('./db.config');

/**
 * Module exports
 */
module.exports = {
  server: server[env],
  db: db[env],
};
