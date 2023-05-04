const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vacanciesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lvl: {
        type: String
    },
    time: {
        type: String
    },
    place: {
        type: String
    },
    link: {
        type: String
    },
});

vacanciesSchema.set('toJSON', { virtuals: true });
vacanciesSchema.set('toObject', { virtuals: true });
vacanciesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Vacancies', vacanciesSchema);