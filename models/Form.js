const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    ctaServices: { type: Array },
    name: { type: String },
    formName: { type: String },
    company: { type: String },
    link: { type: String },
    phone: { type: String },
    email: { type: String },
    about: { type: String },
    budget: { type: String },
    file: { type: Object },
});

FormSchema.set('toJSON', { virtuals: true });
FormSchema.set('toObject', { virtuals: true });
FormSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Form', FormSchema);