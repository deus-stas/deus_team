const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: { type: String, required: true },
  descr: { type: String },
  link: { type: String },
  videoUrl: { type: String },
  video: { type: Object },
  img: {type: Object}
});

productsSchema.set('toJSON', { virtuals: true });
productsSchema.set('toObject', { virtuals: true });
productsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Products', productsSchema);