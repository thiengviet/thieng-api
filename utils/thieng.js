var configs = global.configs;
var crypto = require('crypto');
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

thiengJS.generateUserId = function (origin, email) {
  if (!origin || !email) return null;
  const hash = crypto.createHash('sha256');
  console.log([origin, email].join('/'))
  hash.update([origin, email].join('/'));
  return hash.digest('hex');
}


module.exports = thiengJS;