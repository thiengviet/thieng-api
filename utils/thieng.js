var configs = global.configs;
var jwt = require('jsonwebtoken');

/**
 * Constructor
 */
var thiengJS = {}

thiengJS.generateToken = function (data) {
  const privateKey = configs.auth.keys.privateKey;
  const token = jwt.sign(data, privateKey, { algorithm: 'RS256' });
  return token;
}

thiengJS.verifyToken = function (token) {
  const publicKey = configs.auth.keys.publicKey;
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, function (er, re) {
      if (er) return reject(er);
      return resolve(re);
    });
  });
}

module.exports = thiengJS;