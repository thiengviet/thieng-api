var configs = global.configs;

var db = require('../db');

module.exports = {

  /**
   * Get user info
   * @function getUser
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getUser: function ({ }, req) {
    const { userId } = req.auth;
    if (!userId) return next('Invalid inputs.');

    return db.User.findOne({ userId });
  }
}