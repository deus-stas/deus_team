const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  name: { type: String, required: true },
  nameInEng: {type: String},
  customId: {type: String},
  image: { type: Object },
  mainVideoFile: { type: Object },
  mainVideo: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
  color: { type: String },
  about: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  bannerFirstVideo: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  bannerSecondVideo: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  bannerThirdVideo: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  bannerFourthVideo: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  bannerFifthVideo: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  projectTheme: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  projectType: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  bannerFirst: { type: Object },
  task: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  taskDescr: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  taskPersons: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  tasksList: { type: Array },
  bannerSecond: { type: Object },
  bannerSeconds: { type: Array },
  bannerThirds: { type: Array },
  approachListFiles: { type: Array },
  bannerFourths: { type: Array },
  bannerFifths: { type: Array },
  approach: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  approachPersons: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  bannerThird: { type: Object },
  body: { type: String, default: '', default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  bannerFourth: { type: Object },
  result: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  resultTextColor: {type: String, default: '#ffffff' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '#ffffff' : v },
  resultPersons: { type: String, default: '#ffffff' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '#ffffff' : v},
  resultPersonsText: {type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  technologies: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  bannerFifth: { type: Object },
  main: {type: Boolean},
  imagesExtra: {type: Array},
  bannerText: {type:String, default: '',set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  controlURL: {type: Boolean},
  projectSite: {type:String, default: '',set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  projectURL: {type:String, default: '',set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  workStepsHeader: {type: String, default: 'Этапы работ', set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? 'Этапы работ' : v},
  workSteps: { type: Array },
  aimColor: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  workStepsColor: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  visibilityTitle1: {type: String, default: '',set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  visibilityImg1: {type: Object},
  visibilityTitle2: {type: String, default: '',set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  visibilityImg2: {type: Object},
  resultsColor: {type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v},
  visibility: {type: Boolean, default: true ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? true : v },
  approachList: {type: Array}
});

projectsSchema.set('toJSON', { virtuals: true });
projectsSchema.set('toObject', { virtuals: true });
projectsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Projects', projectsSchema);