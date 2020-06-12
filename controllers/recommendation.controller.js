var configs = global.configs;

var db = require('../db');

module.exports = {

  /**
   * Recommend items
   * @function recommendItems
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  recommendItems: function (req, res, next) {
    const condition = req.query.condition || {}
    const sample = req.query.sample || configs.db.SAMPLE_DEFAULT;

    return db.Item.aggregate([
      { $match: condition },
      { $sample: { size: sample } },
      { $project: { _id: 1 } }
    ]).exec(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },
}