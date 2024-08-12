const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.get('/', paymentController.getPayments);
router.delete('/:paymentNo', paymentController.deletePayment);
router.get('/:policyNo', paymentController.getPaymentWithPolicy);
router.post('/', paymentController.createPayment);

module.exports = router;