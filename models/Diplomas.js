const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diplomasSchema = new Schema({
    name: { type: String, required: true },
    controlVisibility: {type: Boolean, default: true ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? true : v},
    image: { type: Object },
    diplomaProject: { type: Array }
});

diplomasSchema.set('toJSON', { virtuals: true });
diplomasSchema.set('toObject', { virtuals: true });
diplomasSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Diplomas', diplomasSchema);