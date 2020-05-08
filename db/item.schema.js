var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

/**
 * Schema
 */
var Item = new mongoose.Schema({
  name: { type: String },
  description1: { type: String },
  description2: { type: String },
  price: { type: Number },
  tags: { type: Array, default: [] },
  category: { type: String, default: 'other' },
  images: { type: Array, default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  commentIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  status: { type: String, enum: ['new', 'public', 'archived'], default: 'new' }
});

/**
 * Plugins
 */
Item.plugin(timestamps);

/**
 * Module exports
 */
module.exports = mongoose.model('Item', Item);