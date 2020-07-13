var configs = global.configs;

var db = require('../db');

module.exports = {

  /**
   * Get a comment
   * @function getComment
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getComment: function (req, res, next) {
    const { _id } = req.query;
    if (!_id) return next('Invalid inputs');

    return db.Comment.findOne(
      { _id },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Get comments
   * @function getComments
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getComments: function (req, res, next) {
    const condition = req.query.condition || {}
    const limit = req.query.limit || configs.db.LIMIT_DEFAULT;
    const page = req.query.page || configs.db.PAGE_DEFAULT;

    return db.Comment.aggregate([
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
   * Add a new comment
   * @function addComment
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addComment: function (req, res, next) {
    const auth = req.auth;
    const { comment } = req.body;
    if (!comment) return next('Invalid inputs');

    var newComment = new db.Comment({
      ...comment,
      userId: auth._id,
    });
    return newComment.save(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Update a comment
   * @function updateComment
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  updateComment: function (req, res, next) {
    const auth = req.auth;
    const { comment } = req.body;
    if (!comment) return next('Invalid inputs');

    return db.Comment.findOneAndUpdate(
      { _id: comment._id, userId: auth._id },
      { ...comment, userId: auth._id },
      { new: true },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Delete a comment
   * @function deleteComment
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  deleteComment: function (req, res, next) {
    const auth = req.auth;
    const { comment } = req.body;
    if (!comment) return next('Invalid inputs');

    return db.Comment.findOneAndDelete(
      { _id: comment._id, userId: auth._id },
      function (er, re) {
        if (er) return next('Database error');
        db.Feeling.deleteMany({ targetId: comment._id }, function (er) {
          console.log(er)
        });
        return res.send({ status: 'OK', data: re });
      });
  },
}