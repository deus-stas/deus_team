const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsTagSchema = new Schema({
    name: {type: String, required: true}
});

newsTagSchema.set('toJSON', { virtuals: true });
newsTagSchema.set('toObject', { virtuals: true });
newsTagSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('NewsTags', newsTagSchema);