const mongoose = require('mongoose');
mongoose.pluralize(null);

var Schema = mongoose.Schema;

var categorySchema = new Schema({
  categoryName: { type: String, required: true, unique: true },
  categoryImage: {type: String, required: true, unique: true},
  properties: [{ type: Object }]
});

var categoryModel = mongoose.model('Categories', categorySchema);

module.exports = categoryModel;