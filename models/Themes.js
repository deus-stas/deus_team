const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThemesSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

ThemesSchema.set('toJSON', { virtuals: true });
ThemesSchema.set('toObject', { virtuals: true });
ThemesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Themes', ThemesSchema);