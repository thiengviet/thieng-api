var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

/**
 * Schema
 */
var CartItem = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true }
});

var Cart = new mongoose.Schema({
  // General info
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: { type: [CartItem], required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  // Payment info
  paymentMethod: { type: String, enum: ['cod', 'credit', 'momo', 'vnpay'], default: 'cod' },
  paymentStatus: { type: Boolean, default: false },
  promoCode: { type: String },
  // Delivery info
  receiverName: { type: String },
  receiverPhone: { type: String },
  receiverAddress: { type: String },
  note: { type: String },
  // Flags
  status: { type: String, enum: ['waiting', 'packaging', 'delivering', 'canceled', 'done'], default: 'waiting' },
});

/**
 * Plugins
 */
Cart.plugin(timestamps);

/**
 * Module exports
 */
module.exports = mongoose.model('Cart', Cart);