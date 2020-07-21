var fs = require('fs');
var devGoogleAuth = require('./keys/google/dev.google-auth.json');
var devFacebookAuth = require('./keys/facebook/dev.facebook-auth.json');
var stagingGoogleAuth = require('./keys/google/staging.google-auth.json');
var stagingFacebookAuth = require('./keys/facebook/staging.facebook-auth.json');

/**
 * Contructor
 */
var configs = {};

/**
 * Development configurations
 */
configs.development = {
  keys: {
    publicKey: fs.readFileSync(__dirname + '/keys/auth/dev.public.pem'),
    privateKey: fs.readFileSync(__dirname + '/keys/auth/dev.private.key'),
  },
  google: {
    clientId: devGoogleAuth.client_id,
    projectId: devGoogleAuth.project_id,
    javascriptOrigins: devGoogleAuth.javascript_origins
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
    publicKey: fs.readFileSync(__dirname + '/keys/auth/staging.public.pem'),
    privateKey: fs.readFileSync(__dirname + '/keys/auth/staging.private.key'),
  },
  google: {
    clientId: stagingGoogleAuth.client_id,
    projectId: stagingGoogleAuth.project_id,
    javascriptOrigins: stagingGoogleAuth.javascript_origins
  },
  facebook: {
    appId: stagingFacebookAuth.app_id
  },
  apple: {}
};

/**
 * Production configurations
 */
configs.production = {
  keys: {
    publicKey: fs.readFileSync(__dirname + '/keys/auth/production.public.pem'),
    privateKey: fs.readFileSync(__dirname + '/keys/auth/production.private.key'),
  },
  google: {},
  facebook: {},
  apple: {}
};

/**
 * Module exports
 */
module.exports = configs;