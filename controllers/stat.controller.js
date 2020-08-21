var configs = global.configs;

var db = require('../db');

module.exports = {

  /**
   * Get an order
   * @function getNumberProducts
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getNumberProducts: function (req, res, next) {
    const { condition } = req.query;
    if (!condition) return next('Invalid inputs');

    console.log(condition)

    return db.Item.count(
      condition,
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },
}