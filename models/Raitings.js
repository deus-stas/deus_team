const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raitingsSchema = new Schema({
    name: { type: String, required: true },
    image: { type: Object },
    raitingProject: { type: Array }
});

raitingsSchema.set('toJSON', { virtuals: true });
raitingsSchema.set('toObject', { virtuals: true });
raitingsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Raitings', raitingsSchema);