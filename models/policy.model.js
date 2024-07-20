const mongoose = require('mongoose');

const PolicySchema = mongoose.Schema({
    policyNo: { type: String, unique: true, primaryKey: true, required: true, MinKey: 8, MaxKey: 8 },
    customerNo: { type: String, ref: 'Customer', required: true, unique: true, foreignKey: true, MinKey: 11, MaxKey: 11 },
    policyStatus: { type: String, required: true, MaxKey: 1 },
    policyTypeCode: { type: String, required: true },
    policyPrim: { type: Number, required: true },
    policyAgent: { type: String, required: true },
    policyEnterDate: { type: Date, required: true },
    policyStartDate: { type: Date, required: true },
    policyEndDate: { type: Date, required: true },
}, { versionKey: false });

const Policy = mongoose.model('Policy', PolicySchema);
module.exports = Policy;