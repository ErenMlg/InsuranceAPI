const mongoose = require('mongoose');

const PolicySchema = mongoose.Schema({
    policyNo: { type: String, unique: true, primaryKey: true, required: false, MinKey: 8, MaxKey: 8 },
    customerNo: { type: String, required: true, MinKey: 11, MaxKey: 11 },
    policyStatus: { type: String, required: true, MaxKey: 1 },
    policyTypeCode: { type: Number, required: true },
    policyPrim: { type: Number, required: true },
    policyAgent: { type: String, required: true },
    policyEnterDate: { type: Date, required: true },
    policyStartDate: { type: Date, required: false },
    policyEndDate: { type: Date, required: false },
}, { versionKey: false });

const Policy = mongoose.model('Policy', PolicySchema);
module.exports = Policy;