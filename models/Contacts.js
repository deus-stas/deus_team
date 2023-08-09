const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
    pageName: { type: String, required: true },
    title: { type: String},
    description: { type: String},
    image: { type: Object },
});

ContactsSchema.set('toJSON', { virtuals: true });
ContactsSchema.set('toObject', { virtuals: true });
ContactsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Contacts', ContactsSchema);