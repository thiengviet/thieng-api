var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

/**
 * Schema
 */
var Item = new mongoose.Schema({
  // Info
  name: { type: String },
  description1: { type: String },
  description2: { type: String },
  price: { type: Number },
  tags: { type: Array, default: [] },
  category: { type: String, default: 'other' },
  thumbnailId: { type: mongoose.Schema.Types.ObjectId },
  fileIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  // Relationship
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  commentIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  // Flags
  status: { type: String, enum: ['creating', 'selling', 'archived'], default: 'creating' },
});

/**
 * Plugins
 */
Item.plugin(timestamps);

/**
 * Module exports
 */
module.exports = mongoose.model('Item', Item);