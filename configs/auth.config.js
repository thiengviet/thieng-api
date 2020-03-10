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
    "client_id": "114004784341-bk6g9beaf47m6tlkldi22f5vg7lu1k3m.apps.googleusercontent.com",
    "project_id": "thieng-1583675924547",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "HsP-3ar5mDPHW9h9gkY6QPyN",
    "javascript_origins": [
      "http://localhost:3000"
    ]
  },
  facebook: {
    "app_id": "196596601435084"
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