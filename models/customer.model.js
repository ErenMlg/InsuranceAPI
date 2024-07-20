const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    customerID : { type: String, unique: true, primaryKey: true, required: true, MinKey:11, MaxKey:11 },
    customerName : { type: String, required: true },
    customerSurname : { type: String, required: true },
    customerBirthdate : { type: Date, required: true },
    customerEmail : { type: String, required: true },
    customerPhone : { type: String, required: true, MinKey:11, MaxKey:11 },
    customerProvince : { type: String, required: true },
    customerDistrict : { type: String, required: true },
}, { versionKey: false});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;