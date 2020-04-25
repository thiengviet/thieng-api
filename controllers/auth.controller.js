var properties = global.properties;
var googleJS = require('../utils/google');
var facebookJS = require('../utils/facebook');
var thiengJS = require('../utils/thieng');


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
    const [service, accessToken] = authorization.split(' ');
    if (!service || !accessToken) return next(properties('error.401.1'));

    if (service == 'google') {
      return googleJS.verifyToken(accessToken).then(re => {
        const userId = thiengJS.generateUserId('google', re.email);
        if (!userId) return next(properties('error.401.2'));

        req.auth = {
          userId: userId,
          service: 'thieng',
          origin: 'google',
          email: re.email,
          exp: re.exp,
          displayname: re.name,
          avatar: re.picture
        }
        return next();
      }).catch(er => {
        return next(properties('error.401.2'));
      });
    }

    if (service == 'facebook') {
      return facebookJS.verifyToken(accessToken).then(re => {
        const userId = thiengJS.generateUserId('facebook', re.email);
        if (!userId) return next(properties('error.401.2'));

        req.auth = {
          userId: userId,
          service: 'thieng',
          origin: 'facebook',
          email: re.email,
          exp: re.exp,
          displayname: re.name,
          avatar: re.picture
        }
        return next();
      }).catch(er => {
        return next(properties('error.401.2'));
      });
    }

    return next(properties('error.401.2'));
  },

  /**
   * Verify thieng's token
   * @function bearerToken
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  bearerToken: function (req, res, next) {
    const { authorization } = req.headers;
    if (!authorization || typeof authorization != 'string') return next(properties('error.401.1'));
    const [service, accessToken] = authorization.split(' ');
    if (service != 'thieng') return next(properties('error.401.1'));
    if (!accessToken) return next(properties('error.401.1'));

    thiengJS.verifyToken(accessToken).then(re => {
      if (!re) return next(properties('error.401.2'));
      req.auth = re;
      return next();
    }).catch(er => {
      return next(properties('error.401.2'));
    });
  },

  /**
   * Generate access token
   * @function generateToken
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  generateToken: function (req, res, next) {
    const data = req.auth;
    if (!data || typeof data != 'object') return next(properties('error.401.1'));
    const token = thiengJS.generateToken(data);
    const re = {
      ...data,
      accessToken: token
    }
    return res.send({ status: 'OK', data: re });
  }
}