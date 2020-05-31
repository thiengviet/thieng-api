var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var middlewares = require('./helpers/middlewares');

const env = process.env.NODE_ENV || 'development';

/**
 * Watch env
 */
console.info('*** Environment:', env);

/**
 * Configs
 */
var configs = require('./configs');
global.configs = configs;

/**
 * Creating a MongoDB connection
 */
mongoose.Promise = Promise;
mongoose.set('debug', configs.db.MONGO_DEBUG_MODE);
mongoose.connect(configs.db.MONGO_HOST, configs.db.MONGO_CONNECT_OPTION, function (er) {
  if (er) throw er;
  console.info('*** Database successfully connected');
});

/**
 * Creating express server
 */
var app = express();
var server = http.createServer(app);

/**
 * Middlewares
 */
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middlewares.filterBody);
app.use(middlewares.parseParams);
/**
 * Router
 */

// Main APIs
var api = require('./routes/api');
app.use('/public', express.static('public'));
app.use('/', api);

// Error handler
var { uncatchableAPI, errorHandler } = require('./routes/error');
app.use(uncatchableAPI);
app.use(errorHandler);

/**
 * Start server
 */
server.listen(configs.server.PORT);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') throw error;
  var bind = typeof configs.server.PORT === 'string' ? 'Pipe ' + configs.server.PORT : 'Port ' + configs.server.PORT;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      return process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      return process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.info('*** Listening on ' + bind);
}