const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const awardsSchema = new Schema({
    name: { type: String, required: true },
    controlVisibility: {type: Boolean, default: true ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? true : v},
    image: { type: Object },
    awardProject: { type: Array }
});

awardsSchema.set('toJSON', { virtuals: true });
awardsSchema.set('toObject', { virtuals: true });
awardsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Awards', awardsSchema);