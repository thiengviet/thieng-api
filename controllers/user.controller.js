var configs = global.configs;

var { Types } = require('mongoose');

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
    const user = {
      service: auth.origin,
      email: auth.email,
      displayname: auth.displayname,
      avatar: auth.avatar,
      role: 'user' // Default value doesn't work with upsert
    }

    return db.User.findOneAndUpdate(
      { email: user.email },
      { $set: user },
      { upsert: true, new: true },
      function (er, re) {
        if (er) return next(er);
        req.auth._id = Types.ObjectId(re._id);
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
    const auth = req.auth
    const { _id } = req.query;
    if (!_id) return next('Invalid inputs');

    if (auth._id.toString() == _id.toString()) return db.User.findOne({ _id }, function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });

    return db.User.findOne(
      { _id },
      '_id avatar displayname panel',
      function (er, re) {
        if (er) return next('Database error');
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
    const condition = req.query.condition || {}
    const limit = req.query.limit || configs.db.LIMIT_DEFAULT;
    const page = req.query.page || configs.db.PAGE_DEFAULT;

    return db.User.aggregate([
      { $match: condition },
      { $sort: { createdAt: -1 } },
      { $skip: limit * page },
      { $limit: limit },
      { $project: { _id: 1 } }
    ]).exec(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re, pagination: { limit, page } });
    });
  },

  /**
   * Update an user
   * @function updateUser
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  updateUser: function (req, res, next) {
    const auth = req.auth;
    const { user } = req.body;
    if (!user) return next('Invalid inputs');

    return db.User.findOneAndUpdate(
      { _id: auth._id },
      { ...user },
      { new: true },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },
}