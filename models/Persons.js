const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonsSchema = new Schema({
    name: { type: String, required: true },
    image: { type: Object },
    post: { type: String },
});

PersonsSchema.set('toJSON', { virtuals: true });
PersonsSchema.set('toObject', { virtuals: true });
PersonsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Persons', PersonsSchema);