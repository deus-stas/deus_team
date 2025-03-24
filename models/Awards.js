const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defaultBoolean = { type: Boolean, default: true, set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? true : v };

const awardsSchema = new Schema({
    name: { type: String, required: true },
    blogUrl: { type: String, required: true },
    image: { type: Object },
    visibility: defaultBoolean,
});

awardsSchema.set('toJSON', { virtuals: true });
awardsSchema.set('toObject', { virtuals: true });
awardsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Awards', awardsSchema);