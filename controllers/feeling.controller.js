var db = require('../db');
const { auth } = require('google-auth-library');

module.exports = {

  /**
   * Get a feeling
   * @function getFeeling
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getFeeling: function (req, res, next) {
    const auth = req.auth;
    const { condition } = req.query;
    if (!condition) return next('Invalid inputs');

    return db.Feeling.findOne(
      { ...condition, userId: auth._id },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Get feelings
   * @function getFeelings
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getFeelings: function (req, res, next) {
    const condition = req.query.condition || {}

    return db.Feeling.aggregate([
      { $match: condition },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]).exec(function (er, re) {
      if (er) return next('Database error');
      let jsonre = {}
      re.forEach(item => { jsonre[item._id] = item.count });
      return res.send({ status: 'OK', data: jsonre });
    });
  },

  /**
   * Add a new feeling
   * @function addFeeling
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addFeeling: function (req, res, next) {
    const auth = req.auth;
    const { feeling } = req.body;
    if (!feeling) return next('Invalid inputs');

    var newFeeling = new db.Feeling({
      ...feeling,
      userId: auth._id,
    });
    return newFeeling.save(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Update a feeling
   * @function updateFeeling
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  updateFeeling: function (req, res, next) {
    const auth = req.auth;
    const { feeling } = req.body;
    if (!feeling) return next('Invalid inputs');

    return db.Feeling.findOneAndUpdate(
      { targetId: feeling.targetId, userId: auth._id },
      { ...feeling, userId: auth._id },
      { new: true },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Delete a feeling
   * @function deleteFeeling
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  deleteFeeling: function (req, res, next) {
    const auth = req.auth;
    const { feeling } = req.body;
    if (!feeling) return next('Invalid inputs');

    return db.Feeling.findOneAndDelete(
      { targetId: feeling.targetId, userId: auth._id },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },
}