const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
    name: { type: String, required: true },
    service: { type: String },
    type: { type: String },
    reviewFile: { type: Object },
    reviewName: { type: String },
    reviewPost: { type: String },
    reviewImage: { type: Object },
    review: { type: String },
    reviewProject: { type: String },
    reviewService: { type: String },
});

servicesSchema.set('toJSON', { virtuals: true });
servicesSchema.set('toObject', { virtuals: true });
servicesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Reviews', servicesSchema);