const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
  name: { type: String, required: true },
  descrTotal: { type: String },
  descr: { type: String },
  benefitsTitle: { type: String },
  benefits: { type: Array },
  servicesServices: { type: Array },
  work: { type: Array },
  tariffs: { type: Array },
  position: {type: Number},
  blockTitle: {type:String}
});

servicesSchema.set('toJSON', { virtuals: true });
servicesSchema.set('toObject', { virtuals: true });
servicesSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Services', servicesSchema);