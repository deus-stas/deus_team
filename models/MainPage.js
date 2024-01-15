const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainPageSchema = new Schema({
    name: { type: String, required: true },
    pageURL: { type: String},
    image: { type: Object },
    textList: { type: Array },
    mainVideoFile: { type: Object },
});

mainPageSchema.set('toJSON', { virtuals: true });
mainPageSchema.set('toObject', { virtuals: true });
mainPageSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model(' MainPage', mainPageSchema);