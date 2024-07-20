const { version } = require('mongoose');
const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    policyNo: { type: String, ref:'Policy', required: true, unique: true, foreignKey: true,  MinKey:8, MaxKey:8},
    plateProvinceCode: { type: String, required: true },
    plateCode: { type: String, required: true },
    carMark: { type: String, required: true },
    carModel: { type: String, required: true },
    carModelYear: { type: String, required: true },
    carMotorNo: { type: String, required: true, unique: true, primaryKey: true },
    carChassisNo: { type: String, required: true },
},{ versionKey: false });

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;