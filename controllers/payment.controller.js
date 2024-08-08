const Payment = require('../models/payment.model');
const Policy = require('../models/policy.model');

const getPaymentWithPolicy = async (req, res) => {
    try {
        const policyNo = req.params.policyNo;
        const payments = await Payment.find({ policyNo: policyNo });
        res.status(200).json({count: payments.length, data: payments});
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createPayment = async (req, res) => {
    try {
        const policy = await Policy.findOne({ policyNo: req.body.policyNo });
        if (policy) {
            if (!policy.policyStatus) {
                return res.status(404).json({ message: "Policy is not accepted yet." });
            }
            const payment = await Payment.create(req.body);
            return res.status(200).json(payment);
        } else {
            return res.status(404).json({ message: 'Policy not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getPaymentWithPolicy,
    createPayment
}