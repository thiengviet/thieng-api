var configs = global.configs;

var db = require('../db');
var utils = require('../helpers/utils');


module.exports = {

  /**
   * Get a project
   * @function getProject
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getProject: function (req, res, next) {
    const auth = req.auth;
    const { _id } = req.query;
    if (!_id) return next('Invalid inputs');

    return db.Project.findOne(
      { _id, $or: [{ mode: 'public' }, { userId: auth._id }] },
      function (er, re) {
        if (er) return next('Databse error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Get projects
   * @function getProjects
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getProjects: function (req, res, next) {
    const auth = req.auth;
    let { condition } = req.query;
    const limit = Number(req.query.limit) || configs.db.LIMIT_DEFAULT;
    const page = Number(req.query.page) || configs.db.PAGE_DEFAULT;

    condition = utils.parseJSON(condition) || {}
    if (!condition.mode) condition.mode = 'public';
    if (condition.mode == 'private') condition.userId = auth && auth._id;
    if (condition.mode == 'private' && !condition.userId) return req.next('No permission');

    return db.Project.aggregate([
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
   * Add project
   * @function addProject
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addProject: function (req, res, next) {
    const auth = req.auth;
    var { project } = req.body;
    if (!project) return next('Invalid inputs');

    var newProject = new db.Project({
      ...project,
      userId: auth._id,
    });
    return newProject.save(function (er, re) {
      if (er) return next('Databse error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Update a project
   * @function updateProject
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  updateProject: function (req, res, next) {
    var auth = req.auth;
    var { project } = req.body;
    if (!project) return next('Invalid inputs');

    return db.Project.findOneAndUpdate(
      { _id: project._id, userId: auth._id },
      { ...project, userId: auth._id },
      { new: true },
      function (er, re) {
        if (er) return next('Databse error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Delete a project
   * @function deleteProject
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  deleteProject: function (req, res, next) {
    var auth = req.auth;
    var { project } = req.body;
    if (!project) return next('Invalid inputs');

    return db.Project.findOneAndDelete(
      { _id: project._id, userId: auth._id },
      function (er, re) {
        if (er) return next('Databse error');
        return res.send({ status: 'OK', data: re });
      });
  },
}