const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  name: { type: String, required: true },
  image: { type: Object },
  body: { type: String },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
});

newsSchema.set('toJSON', { virtuals: true });
newsSchema.set('toObject', { virtuals: true });
newsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('News', newsSchema);