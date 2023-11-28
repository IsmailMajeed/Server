const mongoose = require('mongoose')
mongoose.pluralize(null)

var Schema = mongoose.Schema

var orderSchema = new Schema({
  line_items: [{ type: Object, required: true }],
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  streetAddress: { type: String, required: true },
  appartment: { type: String },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  totalPrice: {type: Number},
  status: String,
  paid: Boolean,
}, {
  timestamps: true,
})

var orderModel = mongoose.model('Orders', orderSchema)

module.exports = orderModel