var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

/**
 * Schema
 */
var User = new mongoose.Schema({
  userId: { type: String },
  username: { type: String },
  email: { type: String, required: true },
  displayname: { type: String },
  avatarUrl: { type: String },
});

/**
 * Plugins
 */
User.plugin(timestamps);

/**
 * Module exports
 */
module.exports = mongoose.model('User', User);