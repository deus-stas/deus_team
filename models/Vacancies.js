const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defaultBoolean = { type: Boolean, default: true, set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? true : v };

const vacanciesSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    type: {
        type: String
    },
    place: {
        type: String
    },
    link: {
        type: String
    },
    visibility: defaultBoolean,
});

vacanciesSchema.set('toJSON', { virtuals: true });
vacanciesSchema.set('toObject', { virtuals: true });
vacanciesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Vacancies', vacanciesSchema);