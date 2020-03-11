var properties = global.properties;
var configs = global.configs;
var axios = require('axios');
var jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

/**
 * Google authentication
 */
const googleClient = new OAuth2Client(configs.auth.google.clientId);
const googleToken = function (token) {
  return new Promise((resolve, reject) => {
    googleClient.verifyIdToken({ idToken: token }).then(re => {
      let payload = re.getPayload();
      return resolve(payload);
    }).catch(er => {
      return reject(er);
    });
  });
}

/**
 * Facebook authentication 
 */
const facebookClient = {
  verifyIdToken: function (token) {
    return axios({
      method: 'get',
      url: 'https://graph.facebook.com/v6.0/debug_token',
      params: { input_token: token, access_token: token }
    });
  },
  getUserData: function (userId, token) {
    return axios({
      method: 'get',
      url: 'https://graph.facebook.com/v6.0/' + userId,
      params: { fields: 'id,name,email,picture', access_token: token }
    });
  }
}
const facebookToken = function (accessToken) {
  var data = {}
  return new Promise((resolve, reject) => {
    facebookClient.verifyIdToken(accessToken).then(re => {
      let payload = re.data;
      if (!payload) return reject('No data');

      data.userId = payload.data.user_id;
      data.exp = payload.data.data_access_expires_at;
      return facebookClient.getUserData(data.userId, accessToken)
    }).then(re => {
      let payload = re.data;
      if (!payload) return reject('No data');

      data.email = payload.email;
      data.name = payload.name;
      data.picture = payload.picture.data.url;
      return resolve(data);
    }).catch(er => {
      return reject(er);
    })
  })
}

/**
 * Token generation
 */
generate = (data) => {
  const privateKey = configs.auth.keys.privateKey;
  const token = jwt.sign(data, privateKey, { algorithm: 'RS256' });
  return token;
}
verify = (accessToken) => {
  const publicKey = configs.auth.keys.publicKey;
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, publicKey, function (er, re) {
      if (er) return reject(er);
      return resolve(re);
    });
  });
}

module.exports = {

  /**
   * Verify third party's token
   * @function oauthToken
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  oauthToken: function (req, res, next) {
    const { authorization } = req.headers;
    if (!authorization || typeof authorization != 'string') return next(properties('error.401.1'));
    const [service, accessToken] = authorization.split(" ");
    if (!service || !accessToken) return next(properties('error.401.1'));

    if (service == 'google') {
      return googleToken(accessToken).then(re => {
        const data = {
          service: 'thieng',
          origin: 'google',
          email: re.email,
          exp: re.exp,
          displayname: re.name,
          avatar: re.picture
        }
        const token = generate(data);
        req.auth = {
          ...data,
          accessToken: token
        }
        return next();
      }).catch(er => {
        return next(properties('error.401.2'));
      });
    }

    if (service == 'facebook') {
      return facebookToken(accessToken).then(re => {
        const data = {
          service: 'thieng',
          origin: 'facebook',
          email: re.email,
          exp: re.exp,
          displayname: re.name,
          avatar: re.picture
        }
        const token = generate(data);
        req.auth = {
          ...data,
          accessToken: token
        }
        return next();
      }).catch(er => {
        return next(properties('error.401.2'));
      });
    }

    return next(properties('error.401.2'));
  },

  /**
   * Generate access token
   * @function generateToken
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  generateToken: function (req, res, next) {
    return res.send({ status: 'OK', data: req.auth });
  }
}