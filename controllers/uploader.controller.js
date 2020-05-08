var configs = global.configs;
var multer = require('multer');

var db = require('../db');

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
        fileSize: configs.db.LIMIT_FILE_SIZE[type]
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
   * Upload images
   * @function uploadImage
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  uploadImage: function (req, res, next) {
    console.log(req.file)
    console.log(req.body)
    return res.send({ status: 'OK', data: req.body });
  }
}