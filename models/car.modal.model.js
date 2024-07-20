const mongoose = require('mongoose');

const CarModalSchema = mongoose.Schema({
    markID : { type: String, required: true, uniqueKey: true },
    modal: { type: String, required: true },
    modelID: { type: String, required: true, autoIncrement: true },
}, { versionKey: false });

const CarModal = mongoose.model('CarModal', CarModalSchema);
module.exports = CarModal;  