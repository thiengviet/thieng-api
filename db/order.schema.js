var mongoose = require('mongoose');

/**
 * Schema
 */
var OrderItem = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true }
}, { timestamps: true });

var OrderStatusHistory = new mongoose.Schema({
  status: { type: String, required: true },
}, { timestamps: true });

var Order = new mongoose.Schema({
  // General info
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  items: { type: [OrderItem], required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  // Payment info
  paymentMethod: { type: String, enum: ['cod', 'credit', 'momo', 'vnpay', 'bank'], default: 'cod' },
  paymentStatus: { type: Boolean, default: false },
  promoCode: { type: String },
  // Delivery info
  receiverName: { type: String },
  receiverPhone: { type: String },
  receiverAddress: { type: String },
  note: { type: String },
  // Flags
  status: { type: String, enum: ['waiting', 'packaging', 'delivering', 'canceled', 'done'], default: 'waiting' },
  statusHistory: { type: [OrderStatusHistory], default: [] }
}, { timestamps: true });

/**
 * Module exports
 */
module.exports = mongoose.model('Order', Order);