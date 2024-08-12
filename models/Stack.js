const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stackSchema = new Schema({
    name: {type: String, required: true},
    image: { type: Object },
});

stackSchema.set('toJSON', { virtuals: true });
stackSchema.set('toObject', { virtuals: true });
stackSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Stacks', stackSchema);