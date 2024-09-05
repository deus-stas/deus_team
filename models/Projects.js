const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultString = { type: String, default: '', set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? '' : v };
const defaultBoolean = { type: Boolean, default: true, set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? true : v };
const defaultArray = { type: Array };

const projectsSchema = new Schema({
  name: { type: String, required: true },
  heading: defaultString,
  stack: defaultArray,
  date: defaultString,
  stageName: defaultString,
  tasksItem: defaultString,
  duration: defaultString,
  descrProject: defaultString,
  seoTitle: defaultString,
  seoKeywords: defaultString,
  seoDescription: defaultString,
  nameInEng: String,
  customId: String,
  image: Object,
  imageMob: Object,
  mainVideoFile: Object,
  mainMobVideoFile: Object,
  mainVideo: defaultString,
  about: defaultString,
  bannerFirstVideo: defaultString,
  bannerSecondVideo: defaultString,
  bannerThirdVideo: defaultString,
  bannerFourthVideo: defaultString,
  bannerFifthVideo: defaultString,
  projectTheme: defaultString,
  projectType: defaultString,
  bannerFirst: Object,
  task: defaultString,
  taskDescr: defaultString,
  taskPersons: defaultString,
  tasksList: defaultArray,
  bannerSecond: Object,
  bannerSeconds: defaultArray,
  bannerThirds: defaultArray,
  approachListFiles: defaultArray,
  approachListSecondFiles: defaultArray,
  approachListThirdFiles: defaultArray,
  bannerFourths: defaultArray,
  bannerFifths: defaultArray,
  approach: defaultString,
  workIntroText: defaultString,
  approachPersons: defaultString,
  bannerThird: Object,
  body: defaultString,
  bannerFourth: Object,
  result: defaultString,
  taskDo: defaultString,
  resultPersons: { type: String, default: '#ffffff' },
  resultPersonsText: defaultString,
  technologies: defaultString,
  bannerFifth: Object,
  main: Boolean,
  imagesExtra: defaultArray,
  bannerText: defaultString,
  controlURL: Boolean,
  projectSite: defaultString,
  workStepsIntroText: defaultString,
  projectURL: defaultString,
  awardsURL: defaultString,
  workStepsHeader: { type: String, default: 'Этапы работ' },
  workSteps: defaultArray,
  metrics: defaultArray,
  visibilityTitle1: defaultString,
  visibilityImg1: Object,
  visibilityTitle2: defaultString,
  visibilityImg2: Object,
  visibility: defaultBoolean,
  approachList: defaultArray,
  approachListSecond: defaultArray,
  approachListThird: defaultArray,
});

projectsSchema.set('toJSON', { virtuals: true });
projectsSchema.set('toObject', { virtuals: true });
projectsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Projects', projectsSchema);