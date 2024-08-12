const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    }
});

TypesSchema.set('toJSON', { virtuals: true });
TypesSchema.set('toObject', { virtuals: true });
TypesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Types', TypesSchema);