const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
  name: { type: String, required: true },
  path: {type: String},
  brief: {type: Object},
  description: { type: String, default: '', set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? '' : v },
  imageDescription: { type: String, default: '', set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? '' : v },
  descrTotal: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  descr: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  benefitsTitle: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  benefits: { type: Array },
  servicesServices: { type: Array },
  work: { type: Array },
  tariffs: { type: Array },
  position: {type: Number},
  blockTitle: {type:String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  seoTitle: {type:String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  seoDescription: {type:String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  seoKeywords: {type:String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  subProjects: {type: Array},
  types: [{ type: Schema.Types.ObjectId, ref: 'Types' }],
  isInvisible: {type: Boolean, default: true ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? true : v },
  whyChooseUsTitle: { type: String, default: '', set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? '' : v },
  whyChooseUsOptions: { type: Array },
  serviceIncludesTitle: { type: String, default: '', set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? '' : v },
  serviceIncludesDescription: { type: String, default: '', set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? '' : v },
  serviceIncludesOptions: { type: Array },
  faqTitle: { type: String, default: '', set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? '' : v },
  faqOptions: { type: Array },
  asproTemplatesTitle: { type: String, default: '', set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? '' : v },
  asproTemplatesDescription: { type: String, default: '', set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? '' : v },
  asproTemplatesOptions: { type: Array },
  serviceBanner: Object,
});

servicesSchema.set('toJSON', { virtuals: true });
servicesSchema.set('toObject', { virtuals: true });
servicesSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Services', servicesSchema);