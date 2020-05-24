var configs = global.configs;

var db = require('../db');
var utils = require('../helpers/utils');


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
  },

  /**
   * Get users info
   * @function getUsers
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getUsers: function (req, res, next) {
    let { condition } = req.query;
    const limit = Number(req.query.limit) || configs.db.LIMIT_DEFAULT;
    const page = Number(req.query.page) || configs.db.PAGE_DEFAULT;

    condition = utils.parseJSON(condition) || {}

    return db.User.aggregate([
      { $match: condition },
      { $sort: { createdAt: -1 } },
      { $skip: limit * page },
      { $limit: limit },
      { $project: { _id: 1, avatar: 1, displayname: 1, panel: 1 } }
    ]).exec(function (er, re) {
      if (er) return next('Databse error');
      return res.send({ status: 'OK', data: re, pagination: { limit, page } });
    });
  }
}