const mongoose = require('mongoose');
mongoose.pluralize(null);

var Schema = mongoose.Schema;

var FeaturedSchema = new Schema({
  bigImg: { type: String, required: true, unique: true },
  smallImg: {type: String, required: true, unique: true}
});

var FeaturedModel = mongoose.model('Featured', FeaturedSchema);

module.exports = FeaturedModel;