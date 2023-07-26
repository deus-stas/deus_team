const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
    name: { type: String, required: true },
    service: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
    type: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
    reviewFile: { type: Object },
    reviewName: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
    reviewPost: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
    reviewImage: { type: Object },
    review: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
    reviewProject: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
    reviewService: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v },
    reviewBg: { type: Object },
});

servicesSchema.set('toJSON', { virtuals: true });
servicesSchema.set('toObject', { virtuals: true });
servicesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Reviews', servicesSchema);