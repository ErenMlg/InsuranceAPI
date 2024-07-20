const { version } = require('mongoose');
const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    policyNo: { type: String, ref:'Policy', required: true, unique: true, foreignKey: true,  MinKey:8, MaxKey:8},
    paymentAmount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    creditCardNumber: { type: String, required: true },
    creditCardDate: { type: Date, required: true },
    creditCardName: { type: String, required: true },
    creditCardCVC: { type: String, required: true },
}, { versionKey: false });

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;