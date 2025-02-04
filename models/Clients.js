const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defaultBoolean = { type: Boolean, default: true, set: v => (v === null || v === 'null' || v === 'undefined' || v === undefined) ? true : v };

const ClientsSchema = new Schema({
    name: { type: String, required: true },
    image: { type: Object },
    visibility: defaultBoolean,
});

ClientsSchema.set('toJSON', { virtuals: true });
ClientsSchema.set('toObject', { virtuals: true });
ClientsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Clients', ClientsSchema);