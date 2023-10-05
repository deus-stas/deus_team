const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seoSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    seoPages: {
        type: String,
        required: true
    },

    seoTitle: {
        type: String,
        default: '',
        set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? '' : v
    },
    seoDescription: {
        type: String,
        default: '',
        set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? '' : v
    },
    seoKeywords: {
        type: String,
        default: '',
        set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? '' : v
    },
});

seoSchema.set('toJSON', {virtuals: true});
seoSchema.set('toObject', {virtuals: true});
seoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('SEO', seoSchema);