const { OAuth2Client } = require('google-auth-library');

/**
 * Google authentication
 */
const googleClient = new OAuth2Client(configs.auth.google.clientId);

/**
 * Constructor
 */
var googleJS = {}

googleJS.verifyToken = function (token) {
  return new Promise((resolve, reject) => {
    googleClient.verifyIdToken({ idToken: token }).then(re => {
      let payload = re.getPayload();
      return resolve(payload);
    }).catch(er => {
      return reject(er);
    });
  });
}

module.exports = googleJS;