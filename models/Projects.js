const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  name: { type: String, required: true },
  image: { type: Object },
  mainVideo: { type: String },
  color: { type: String },
  about: { type: String },
  bannerFirstVideo: { type: String },
  bannerSecondVideo: { type: String },
  bannerThirdVideo: { type: String },
  bannerFourthVideo: { type: String },
  bannerFifthVideo: { type: String },
  projectTheme: { type: String },
  projectType: { type: String },
  bannerFirst: { type: Object },
  task: { type: String },
  taskDescr: { type: String },
  taskPersons: { type: String },
  tasksList: { type: Array },
  bannerSecond: { type: Object },
  approach: { type: String },
  approachPersons: { type: String },
  bannerThird: { type: Object },
  body: { type: String },
  bannerFourth: { type: Object },
  result: { type: String },
  resultPersons: { type: String },
  bannerFifth: { type: Object },
  main: {type: Boolean},
  imagesExtra: {type: Array}
});

projectsSchema.set('toJSON', { virtuals: true });
projectsSchema.set('toObject', { virtuals: true });
projectsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Projects', projectsSchema);