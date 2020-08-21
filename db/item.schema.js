var mongoose = require('mongoose');

/**
 * Schema
 */
var Item = new mongoose.Schema({
  // Info
  name: { type: String },
  descriptions: { type: [String], default: [] },
  price: { type: Number },
  tags: { type: [String], default: [] },
  category: { type: String, default: 'other' },
  thumbnailId: { type: mongoose.Schema.Types.ObjectId },
  fileIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  // Relationship
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  commentIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  // Flags
  status: { type: String, enum: ['creating', 'selling', 'archived'], default: 'creating' },
}, { timestamps: true });

Item.index({ name: 'text', descriptions: 'text' });

/**
 * Module exports
 */
module.exports = mongoose.model('Item', Item);