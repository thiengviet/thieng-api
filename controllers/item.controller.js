var configs = global.configs;

var db = require('../db');

module.exports = {

  /**
   * Get an item
   * @function getItem
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getItem: function (req, res, next) {
    const auth = req.auth;
    const { _id } = req.query;
    if (!_id) return next('Invalid inputs');

    return db.Item.findOne(
      { _id, $or: [{ status: 'selling' }, { userId: auth._id }] },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Get items
   * @function getItems
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getItems: function (req, res, next) {
    const condition = req.query.condition || {}
    const limit = req.query.limit || configs.db.LIMIT_DEFAULT;
    const page = req.query.page || configs.db.PAGE_DEFAULT;

    return db.Item.aggregate([
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
   * Add a new item
   * @function addItem
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addItem: function (req, res, next) {
    const auth = req.auth;
    const { item } = req.body;
    if (!item) return next('Invalid inputs');

    var newItem = new db.Item({
      ...item,
      userId: auth._id,
    });
    return newItem.save(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Update an item
   * @function updateItem
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  updateItem: function (req, res, next) {
    const auth = req.auth;
    const { item } = req.body;
    if (!item) return next('Invalid inputs');

    return db.Item.findOneAndUpdate(
      { _id: item._id, userId: auth._id },
      { ...item, userId: auth._id },
      { new: true },
      function (er, re) {
        if (er) return next('Database error');
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
    const auth = req.auth;
    const { item } = req.body;
    if (!item) return next('Invalid inputs');

    return db.Item.findOneAndDelete(
      { _id: item._id, userId: auth._id },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },
}