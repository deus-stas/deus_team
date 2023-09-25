const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: { type: String, required: true },
    post: { type: String, required: true },
    image: { type: Object },
    priority: { type: Number }
});

TeamSchema.set('toJSON', { virtuals: true });
TeamSchema.set('toObject', { virtuals: true });
TeamSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Team', TeamSchema);