var configs = global.configs;

var db = require('../db');
var utils = require('../helpers/utils');

module.exports = {

  /**
   * Get item(s)
   * @function getItem
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getItem: function (req, res, next) {
    const auth = req.auth;
    const { _id } = req.query;

    return db.Item.findOne({ _id, userId: auth._id }, function (er, re) {
      if (er) return next('Databse error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Get item(s)
   * @function getItems
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getItems: function (req, res, next) {
    const auth = req.auth;
    let { condition } = req.query;
    const limit = Number(req.query.limit) || configs.db.LIMIT_DEFAULT;
    const page = Number(req.query.page) || configs.db.PAGE_DEFAULT;

    condition = utils.parseJSON(condition) || {}
    if (!condition.mode) condition.mode = 'public';
    if (condition.mode == 'private') condition.userId = auth && auth._id;
    if (condition.mode == 'private' && !condition.userId) return req.next('No permission');

    return db.Item.aggregate([
      { $match: condition },
      { $sort: { createdAt: -1 } },
      { $skip: limit * page },
      { $limit: limit },
      { $project: { _id: 1 } }
    ]).exec(function (er, re) {
      if (er) return next('Databse error');
      return res.send({ status: 'OK', data: re, pagination: { limit, page } });
    });
  },


  /**
   * Add a new item
   * @function addItem
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addItem: function (req, res, next) {
    var auth = req.auth;
    var { item } = req.body;
    if (!item) return next('Invalid inputs');

    db.Item.findOne({ _id: item._id }, function (er, existing) {
      if (er) return next('Databse error');

      if (existing) {
        if (existing.status != 'new') return next('The item has been existing');

        return db.Item.findOneAndUpdate(
          { _id: item._id },
          { item },
          { new: true },
          function (er, re) {
            if (er) return next('Databse error');
            return res.send({ status: 'OK', data: re });
          });
      }
      else {
        var newItem = new db.Item({
          ...item,
          userId: auth._id,
        });
        return newItem.save(function (er, re) {
          if (er) return next('Databse error');
          return res.send({ status: 'OK', data: re });
        });
      }
    });
  },

  /**
   * Update an item
   * @function deleteItem
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  updateItem: function (req, res, next) {
    var auth = req.auth;
    var { item } = req.body;
    if (!item) return next('Invalid inputs');

    return db.Item.findOneAndUpdate(
      { _id: item._id, userId: auth._id },
      { ...item, userId: auth._id },
      { new: true },
      function (er, re) {
        if (er) return next('Databse error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Delete an item
   * @function deleteItem
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  deleteItem: function (req, res, next) {
    var auth = req.auth;
    var { item } = req.body;
    if (!item) return next('Invalid inputs');

    return db.Item.findOneAndDelete({ _id: item._id, userId: auth._id }, function (er, re) {
      if (er) return next('Databse error');
      return res.send({ status: 'OK', data: re });
    });
  },
}