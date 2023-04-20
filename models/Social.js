const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialSchema = new Schema({
    name: { type: String, required: true },
    color: { type: String },
    descr: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: Object },
});

socialSchema.set('toJSON', { virtuals: true });
socialSchema.set('toObject', { virtuals: true });
socialSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Social', socialSchema);