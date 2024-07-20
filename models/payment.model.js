const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    policyNo: { type: mongoose.Schema.Types.ObjectId, ref:'Policy' , required: true, },
    paymentAmount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    creditCardNumber: { type: String, required: true },
    creditCardDate: { type: Date, required: true },
    creditCardName: { type: String, required: true },
    creditCardCVC: { type: String, required: true },
});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;