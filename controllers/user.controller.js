// var configs = global.configs;

var db = require('../db');

module.exports = {

  /**
   * Sync user info
   * @function syncUser
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  syncUser: function (req, res, next) {
    var auth = req.auth;
    var user = {
      service: auth.origin,
      email: auth.email,
      displayname: auth.displayname,
      avatar: auth.avatar,
      role: 'user' // Default value doesn't work with upsert
    }

    db.User.findOneAndUpdate(
      { email: user.email },
      { $set: user },
      { upsert: true, new: true },
      function (er, re) {
        if (er) return next(er);

        req.auth._id = re._id;
        return next();
      });
  },

  /**
   * Get user info
   * @function getUser
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getUser: function (req, res, next) {
    var auth = req.auth;
    if (!auth) return next('Invalid inputs');

    db.User.findOne({ email: auth.email }, function (er, re) {
      if (er) return next('Databse error');

      return res.send({ status: 'OK', data: re });
    });
  }
}