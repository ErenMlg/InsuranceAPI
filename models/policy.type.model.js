const mongoose = require('mongoose');

const PolicyTypeSchema = mongoose.Schema({
    policyTypeID: { type: String, unique: true, primaryKey: true, required: true },
    policyType: { type: String, required: true },
}, { versionKey: false });

const PolicyType = mongoose.model('PolicyType', PolicyTypeSchema);
module.exports = PolicyType;