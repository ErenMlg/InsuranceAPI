const mongoose = require('mongoose');

const PolicySchema = mongoose.Schema({
    policyNo : { type: String, unique: true, primaryKey: true, required: true, MinKey:8, MaxKey:8 },
    customerNo : { type: String, required: true },
    policyStatus : { type: Boolean, required: true },
    policyTypeCode : { type: String, required: true, MaxKey: 1 },
    policyPrim : { type: Number, required: true },
    policyAgent : { type: String, required: true },
    policyEnterDate : { type: Date, required: true },
    policyStartDate : { type: Date, required: true },
    policyEndDate : { type: Date, required: true },
}, { versionKey: false});

const Policy = mongoose.model('Policy', PolicySchema);
module.exports = Policy;