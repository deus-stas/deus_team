const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  name: { type: String, required: true },
  urlName: {type: String},
  image: { type: Object },
  photoSlider: { type: Array },
  body: { type: String },
  body2: { type: String },
  workStepsItem: { type: String },
  mainControl: {type: Boolean},
  detailControl: {type: Boolean},
  aboutClient: {type: String},
  aboutClient2: {type: String},
  newsTags: [{ type: Schema.Types.ObjectId, ref: 'NewsTags' }]
});

newsSchema.set('toJSON', { virtuals: true });
newsSchema.set('toObject', { virtuals: true });
newsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('News', newsSchema);