var fs = require('fs');
var devGoogleAuth = require('./keys/dev.google-auth.json');
var devFacebookAuth = require('./keys/dev.facebook-auth.json');

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
    clientId: devGoogleAuth.client_id,
    projectId: devGoogleAuth.project_id,
    javascriptOrigins: [devGoogleAuth.javascript_origins]
  },
  facebook: {
    appId: devFacebookAuth.app_id
  },
  apple: {}
};

/**
 * Staging configurations
 */
configs.staging = {
  keys: {
    publicKey: fs.readFileSync(__dirname + '/keys/staging.public.pem'),
    privateKey: fs.readFileSync(__dirname + '/keys/staging.private.key'),
  },
  google: {
    clientId: devGoogleAuth.client_id,
    projectId: devGoogleAuth.project_id,
    javascriptOrigins: [devGoogleAuth.javascript_origins]
  },
  facebook: {
    appId: devFacebookAuth.app_id
  },
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