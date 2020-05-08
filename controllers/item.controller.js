// var configs = global.configs;

var db = require('../db');

module.exports = {

  /**
   * Add a new item
   * @function addItem
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addItem: function (req, res, next) {
    const auth = req.auth;
    const item = req.body.item;

    if (!item) return next('Invalid inputs.');

    let newItem = new db.Item({
      ...item,
      userId: auth._id,
    });
    newItem.save(function (er, re) {
      if (er) return next('Databse error');
      return res.send({ status: 'OK', data: re });
    });
  }
}