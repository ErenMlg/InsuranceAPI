const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    customerID : { type: String, unique: true, primaryKey: true, required: true, MinKey:11, MaxKey:11 },
    customerName : { type: String, required: true },
    customerSurname : { type: Boolean, required: true }
}, { versionKey: false});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;