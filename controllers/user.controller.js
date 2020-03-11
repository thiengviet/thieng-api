var properties = global.properties;
var configs = global.configs;

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
    const auth = req.auth;
    if (!auth) return next(properties('error.400.1'));

    const user = {
      userId: auth.userId,
      service: auth.origin,
      email: auth.email,
      displayname: auth.displayname,
      avatar: auth.avatar,
    }

    db.User.findOneAndUpdate(
      { userId: user.userId },
      { $set: user },
      { upsert: true, new: true },
      function (er, re) {
        if (er) return next(properties('error.500.1'));

        return res.send({ status: 'OK', data: re });
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
    const auth = req.auth;
    if (!user) return next(properties('error.400.1'));

    db.User.findOne({ userId: auth.userId }, function (er, re) {
      if (er) return next(properties('error.500.1'));

      return res.send({ status: 'OK', data: req.auth });
    })
  }
}