const mongoose = require('mongoose')
mongoose.pluralize(null)

var Schema = mongoose.Schema

var productSchema = new Schema({
  productName: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  discount: Number,
  description: String,
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
  featured: Boolean,
  properties: [{ type: Object }],
  Colours: [{ type: String, required: true }],
  Sizes: [{ type: String }],
}, {
  timestamps: true,
})

var productModel = mongoose.model('Products', productSchema)

module.exports = productModel