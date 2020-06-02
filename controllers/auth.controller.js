var googleJS = require('../helpers/google');
var facebookJS = require('../helpers/facebook');
var thiengJS = require('../helpers/thieng');


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
    if (!authorization || typeof authorization != 'string') return next('Unauthenticated request');
    const [service, accessToken] = authorization.split(' ');
    if (!service || !accessToken) return next('Unauthenticated request');

    if (service == 'google') {
      return googleJS.verifyToken(accessToken).then(re => {
        req.auth = {
          service: 'thieng',
          origin: 'google',
          email: re.email,
          exp: re.exp,
          displayname: re.name,
          avatar: re.picture
        }
        return next();
      }).catch(er => {
        return next(er);
      });
    }

    if (service == 'facebook') {
      return facebookJS.verifyToken(accessToken).then(re => {
        req.auth = {
          service: 'thieng',
          origin: 'facebook',
          email: re.email,
          exp: re.exp,
          displayname: re.name,
          avatar: re.picture
        }
        return next();
      }).catch(er => {
        return next(er);
      });
    }

    return next('Unsupported service');
  },

  /**
   * Verify thieng's token
   * @function bearerToken
   * @param {*} loose - default false
   * If loose is false, the auth process works without exceptions 
   * even thought invalid access token, however, req.auth will be null.
   * Else, vice versa.
   */
  bearerToken: function (loose = false) {
    return function (req, res, next) {
      let { authorization } = req.headers;
      if (!authorization || typeof authorization != 'string') {
        if (!loose) return next('Unauthenticated request');
        else authorization = 'thieng fake-token';
      }
      const [service, accessToken] = authorization.split(' ');
      if (service != 'thieng') return next('Unsupported service');
      if (!accessToken) return next('Invalid token');

      req.auth = {}
      thiengJS.verifyToken(accessToken).then(re => {
        if (!re && !loose) return next('Invalid token');
        if (re) req.auth = re;
        return next();
      }).catch(er => {
        if (!loose) return next(er);
        return next();
      });
    }
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
    if (!data || typeof data != 'object') return next('Unauthenticated request');
    const token = thiengJS.generateToken(data);
    const re = {
      ...data,
      accessToken: token
    }
    return res.send({ status: 'OK', data: re });
  }
}