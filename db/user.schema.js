var mongoose = require('mongoose');

/**
 * Schema
 */
var User = new mongoose.Schema({
  service: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  displayname: { type: String },
  avatar: { type: String },
  panel: { type: mongoose.Schema.Types.ObjectId },
  phone: { type: String },
  addresses: { type: [String], default: [] },
  description: { type: String },
  role: { type: String, enum: ['root', 'admin', 'user'], default: 'user' }
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('User', User);