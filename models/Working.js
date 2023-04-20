const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workingSchema = new Schema({
  name: { type: String, required: true },
  image: { type: Object },
});

workingSchema.set('toJSON', { virtuals: true });
workingSchema.set('toObject', { virtuals: true });
workingSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Working', workingSchema);