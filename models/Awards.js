const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const awardsSchema = new Schema({
    name: { type: String, required: true },
    blogUrl: { type: String, required: true },
    image: { type: Object },
});

awardsSchema.set('toJSON', { virtuals: true });
awardsSchema.set('toObject', { virtuals: true });
awardsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Awards', awardsSchema);