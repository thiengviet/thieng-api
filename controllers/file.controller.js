var configs = global.configs;
var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');

var db = require('../db');
var utils = require('../helpers/utils');


/**
 * Creating a S3 connection
 */
aws.config.update({
  accessKeyId: configs.db.S3_ACCESS_KEY,
  secretAccessKey: configs.db.S3_SECRET_KEY,
  region: 'hn',
  endpoint: 'https://ss-hn-1.vccloud.vn',
  apiVersions: {
    s3: '2006-03-01'
  },
});
const s3 = new aws.S3();


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
      storage: multerS3({
        s3: s3,
        bucket: configs.db.S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, callback) {
          return callback(null, Date.now() + '-' + file.originalname)
        }
      }),
    }).single(type);
  },

  /**
   * Add file
   * @function addFile
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addFile: function (req, res, next) {
    const auth = req.auth;
    const file = req.file;
    const { metadata } = req.body;
    if (!file) return next('Invalid inputs');

    const newFile = new db.File({
      name: file.key,
      type: file.mimetype,
      source: file.location,
      userId: auth._id,
      metadata: utils.deepParseJSON(metadata),
    });

    return newFile.save(function (er, re) {
      if (er) return next('Database error');
      return res.send({ status: 'OK', data: re });
    });
  },

  /**
   * Get a file by id
   * @function getFile
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