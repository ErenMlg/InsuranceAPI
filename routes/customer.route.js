const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller.js');

router.get('/', customerController.getCustomer);

router.put('/:customerID', customerController.updateCustomerByNo);

router.delete('/:customerID', customerController.deleteCustomerByNo);

router.post('/', customerController.saveCustomer);

module.exports = router;