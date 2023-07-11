const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const HeaderSchema = new Schema({
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  presentation: { type: Object },
  vk: {type: String},
  telegram: {type: String},
  behance: {type: String}

  
});

HeaderSchema.set('toJSON', { virtuals: true });
HeaderSchema.set('toObject', { virtuals: true });
HeaderSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
module.exports = User = mongoose.model("headerData", HeaderSchema);