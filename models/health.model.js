const { version } = require('mongoose');
const mongoose = require('mongoose');

const HealthSchema = mongoose.Schema({
    policyNo: { type: String, ref:'Policy', required: true, unique: true, foreignKey: true,  MinKey:8, MaxKey:8},
    smoke : { type: Boolean, required: true},
    alcohol : { type: Boolean, required: true},
    drugs : { type: Boolean, required: true},
    sport : { type: Boolean, required: true},
    surgery : { type: Boolean, required: true},
    allergy : { type: Boolean, required: true}
},{ versionKey: false });

const Health = mongoose.model('Health', HealthSchema);
module.exports = Health;