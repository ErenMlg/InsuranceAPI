const express = require('express');
const router = express.Router();
const policyTypeController = require('../controllers/policy.type.controller.js');

router.get('/', policyTypeController.getPolicyTypes);

module.exports = router;