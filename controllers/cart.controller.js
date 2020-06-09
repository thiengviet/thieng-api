var configs = global.configs;

var db = require('../db');

module.exports = {

  /**
   * Get cart
   * @function getCart
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getCart: function (req, res, next) {
    const auth = req.auth;
    const { _id } = req.query;
    if (!_id) return next('Invalid inputs');

    return db.Cart.findOne(
      { _id, userId: auth._id },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Get cart(s)
   * @function getCarts
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getCarts: function (req, res, next) {
    const auth = req.auth;
    const condition = req.query.condition || {}
    const limit = req.query.limit || configs.db.LIMIT_DEFAULT;
    const page = req.query.page || configs.db.PAGE_DEFAULT;

    return db.Cart.aggregate([
      { $match: { ...condition, userId: auth._id } },
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
   * Add cart
   * @function addCart
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addCart: function (req, res, next) {
    const auth = req.auth;
    const { cart } = req.body;
    if (!cart) return next('Invalid inputs');

    var newCart = new db.Cart({
      ...cart,
      userId: auth._id,
    });
    return newCart.save(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Update cart
   * @function updateCart
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  updateCart: function (req, res, next) {
    const auth = req.auth;
    const { cart } = req.body;
    if (!cart) return next('Invalid inputs');

    return db.Cart.findOneAndUpdate(
      { _id: cart._id, userId: auth._id },
      { ...cart, userId: auth._id },
      { new: true },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Delete cart
   * @function deleteCart
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  deleteCart: function (req, res, next) {
    const auth = req.auth;
    const { cart } = req.body;
    if (!cart) return next('Invalid inputs');

    return db.Cart.findOneAndDelete(
      { _id: cart._id, userId: auth._id },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },
}