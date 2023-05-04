const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientsSchema = new Schema({
    name: { type: String, required: true },
    image: { type: Object },
});

ClientsSchema.set('toJSON', { virtuals: true });
ClientsSchema.set('toObject', { virtuals: true });
ClientsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Clients', ClientsSchema);