const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    policyNo: { type: mongoose.Schema.Types.ObjectId, ref:'Policy' , required: true, },
    plateProvinceCode: { type: String, required: true },
    plateCode: { type: String, required: true },
    carMark: { type: String, required: true },
    carModel: { type: String, required: true },
    carModelYear: { type: String, required: true },
    carMotorNo: { type: String, required: true },
    carChassisNo: { type: String, required: true },
});

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;