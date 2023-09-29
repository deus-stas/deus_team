const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: { type: String, required: true },
  descr: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  link: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  videoUrl: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  video: { type: Object },
  img: {type: Object},
  visibility: {type: Boolean, default: true ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? true : v },
});

productsSchema.set('toJSON', { virtuals: true });
productsSchema.set('toObject', { virtuals: true });
productsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Products', productsSchema);