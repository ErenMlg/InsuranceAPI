const mongoose = require('mongoose');

const CarMarkSchema = mongoose.Schema({
    mark: { type: String, required: true },
    markID: { type: String, required: true, autoIncrement: true },
}, { versionKey: false });

const CarMark = mongoose.model('CarMark', CarMarkSchema);
module.exports = CarMark;