var mongoose = require('mongoose');

/**
 * Schema
 */
var Feeling = new mongoose.Schema({
  // Target can be comments
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: { type: String, enum: ['like', 'dislike'], required: true },
}, { timestamps: true });
// Compound indices
Feeling.index({ targetId: 1, userId: 1 });

/**
 * Module exports
 */
module.exports = mongoose.model('Feeling', Feeling);