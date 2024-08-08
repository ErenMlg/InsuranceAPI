const { version } = require('mongoose');
const mongoose = require('mongoose');

const TrafficSchema = mongoose.Schema({
    policyNo: { type: String, ref:'Policy', required: true, unique: true, foreignKey: true,  MinKey:8, MaxKey:8},
    plateProvinceCode: { type: Number, required: true },
    plateCode: { type: String, required: true },
    carMark: { type: String, required: true },
    carModel: { type: String, required: true },
    carModelYear: { type: Number, required: true },
    carMotorNo: { type: String, required: true},
    carChassisNo: { type: String, required: true },
},{ versionKey: false });

const Traffic = mongoose.model('Car', TrafficSchema);
module.exports = Traffic;