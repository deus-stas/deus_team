const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  name: { type: String, required: true },
  urlName: {type: String},
  description: {type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  underAboutClient: {type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  image: { type: Object },
  mainNewsImage: { type: Object },
  bannerSecond: { type: Object },
  bannerThird: { type: Object },
  photoSlider: { type: Array },
  aboutImg: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v  },
  aboutImg2: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v  },
  body: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v  },
  body2: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v  },
  body3: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v  },
  body4: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v  },
  body5: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v  },
  workStepsItem: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v  },
  mainControl: {type: Boolean},
  detailControl: {type: Boolean},
  aboutClient: {type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  aboutClient2: {type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  aboutClient3: {type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  aboutClient4: {type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  newsTags: [{ type: Schema.Types.ObjectId, ref: 'NewsTags' }],
  seoTitle: {type: String},
  seoDescription: {type: String},
  seoKeywords: {type: String},

});

newsSchema.set('toJSON', { virtuals: true });
newsSchema.set('toObject', { virtuals: true });
newsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('News', newsSchema);