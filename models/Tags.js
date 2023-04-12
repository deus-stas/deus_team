const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

tagSchema.set('toJSON', { virtuals: true });
tagSchema.set('toObject', { virtuals: true });
tagSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Tag', tagSchema);