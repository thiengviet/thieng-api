var properties = global.properties;
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
  getUser: function (req, res, next) {
    return res.send({ status: 'OK', data: req.auth });
  }
}