const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.get('/:policyNo', paymentController.getPaymentWithPolicy);
router.post('/', paymentController.createPayment);

module.exports = router;