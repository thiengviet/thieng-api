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
    if (!auth) return next('Unauthenticated request.');

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
        if (er) return next(er);

        return next();
      });
  },
}