var fs = require('fs');

/**
 * Contructor
 */
var configs = {};

/**
 * Development configurations
 */
configs.development = {
  keys: {
    publicKey: fs.readFileSync(__dirname + '/keys/dev.public.pem'),
    privateKey: fs.readFileSync(__dirname + '/keys/dev.private.key'),
  },
  google: {
    clientId: '114004784341-bk6g9beaf47m6tlkldi22f5vg7lu1k3m.apps.googleusercontent.com',
    projectId: 'thieng-1583675924547',
    javascriptOrigins: ['http://localhost:3000']
  },
  facebook: {
    appId: '196596601435084'
  },
  apple: {}
};

/**
 * Staging configurations
 */
configs.staging = {
  keys: {},
  google: {},
  facebook: {},
  apple: {}
};

/**
 * Production configurations
 */
configs.production = {
  keys: {},
  google: {},
  facebook: {},
  apple: {}
};

/**
 * Module exports
 */
module.exports = configs;