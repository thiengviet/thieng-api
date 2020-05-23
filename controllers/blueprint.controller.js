var db = require('../db');

module.exports = {

  /**
   * Get a blueprint
   * @function getBlueprint
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getBlueprint: function (req, res, next) {
    const auth = req.auth;
    const { _id } = req.query;
    if (!_id) return next('Invalid inputs');

    return db.Blueprint.findOne(
      { _id, $or: [{ mode: 'public' }, { userId: auth._id }] },
      function (er, re) {
        if (er) return next('Databse error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Add blueprint
   * @function addBlueprint
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addBlueprint: function (req, res, next) {
    const auth = req.auth;
    var { blueprint } = req.body;
    if (!blueprint) return next('Invalid inputs');

    var newBlueprint = new db.Blueprint({
      ...blueprint,
      userId: auth._id,
    });
    return newBlueprint.save(function (er, re) {
      if (er) return next('Databse error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Update a blueprint
   * @function updateBlueprint
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  updateBlueprint: function (req, res, next) {
    var auth = req.auth;
    var { blueprint } = req.body;
    if (!blueprint) return next('Invalid inputs');

    return db.Item.findOneAndUpdate(
      { _id: blueprint._id, userId: auth._id },
      { ...blueprint, userId: auth._id },
      { new: true },
      function (er, re) {
        if (er) return next('Databse error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Delete a blueprint
   * @function deleteBlueprint
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  deleteBlueprint: function (req, res, next) {
    var auth = req.auth;
    var { blueprint } = req.body;
    if (!blueprint) return next('Invalid inputs');

    return db.Item.findOneAndDelete(
      { _id: blueprint._id, userId: auth._id },
      function (er, re) {
        if (er) return next('Databse error');
        return res.send({ status: 'OK', data: re });
      });
  },
}