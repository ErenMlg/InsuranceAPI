const { version } = require('mongoose');
const mongoose = require('mongoose');

const DaskSchema = mongoose.Schema({
    policyNo: { type: String, ref:'Policy', required: true, unique: true, foreignKey: true,  MinKey:8, MaxKey:8},
    uavt: { type: String, required: true, MinKey:10, MaxKey:10 },
    apartmentMeter: { type: Number, required: true },
    apartmentFloor: { type: Number, required: true },
    apartmentAge: { type: Number, required: true },
    structType: { type: String, required: true },
},{ versionKey: false });

const Dask = mongoose.model('Dask', DaskSchema);
module.exports = Dask;