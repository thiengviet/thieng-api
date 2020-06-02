var configs = global.configs;
var multer = require('multer');

var db = require('../db');
var utils = require('../helpers/utils');

module.exports = {

  /**
   * Middelware uploader
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  middelware: function (type) {
    return multer({
      limits: {
        fieldNameSize: 1024,
        fileSize: configs.db.LIMIT_FILE_SIZE[type],
      },
      fileFilter: function (req, file, callback) {
        if (!Object.keys(configs.db.FILE_TYPES).includes(type))
          return callback('Unsupported file type', false);
        if (!configs.db.FILE_TYPES[type].includes(file.mimetype))
          return callback('Unsupported file type', false);
        return callback(null, true);
      },
      storage: multer.diskStorage({
        destination: function (req, file, callback) {
          return callback(null, configs.db.UPLOADER_PATH[type]);
        },
        filename: function (req, file, callback) {
          return callback(null, Date.now() + '-' + file.originalname);
        }
      })
    }).single(type);
  },

  /**
   * Save info
   * @function saveInfo
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  saveInfo: function (req, res, next) {
    var auth = req.auth;
    var file = req.file;
    var { metadata } = req.body;
    if (!file) return next('Invalid inputs');

    var newFile = new db.File({
      name: file.filename,
      type: file.mimetype,
      source: 'http://localhost:3001/' + file.destination + '/' + file.filename,
      userId: auth._id,
      metadata: utils.deepParseJSON(metadata),
    });

    newFile.save(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Get a file by id
   * @function saveInfo
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  getFile: function (req, res, next) {
    const { _id } = req.query;
    if (!_id) return next('Invalid inputs');

    return db.File.findOne({ _id }, function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Update a file
   * @function updateFile
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  updateFile: function (req, res, next) {
    const auth = req.auth;
    const { file } = req.body;
    if (!file) return next('Invalid inputs');

    return db.File.findOneAndUpdate(
      { _id: file._id, userId: auth._id },
      { metadata: file.metadata },
      { new: true },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },

  /**
   * Delete a file
   * @function deleteFile
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  deleteFile: function (req, res, next) {
    const auth = req.auth;
    const { file } = req.body;
    if (!file) return next('Invalid inputs');

    return db.File.findOneAndDelete(
      { _id: file._id, userId: auth._id },
      function (er, re) {
        if (er) return next('Database error');
        return res.send({ status: 'OK', data: re });
      });
  },
}