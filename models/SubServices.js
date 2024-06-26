const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubServicesSchema = new Schema({
    name: { type: String, required: true },
    image: { type: Object },
    descr: { type: String, default: '' ,set: v => (v === null || v=== 'null' || v === 'undefined' || v === undefined) ? '' : v  },
});

SubServicesSchema.set('toJSON', { virtuals: true });
SubServicesSchema.set('toObject', { virtuals: true });
SubServicesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('SubServices', SubServicesSchema);