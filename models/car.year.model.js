const mongoose = require('mongoose');

const CarYearSchema = mongoose.Schema({
    year: { type: String, required: true },
}, { versionKey: false });

const CarYear = mongoose.model('CarYear', CarYearSchema);
module.exports = CarYear;