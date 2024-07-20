const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policy.controller.js');

router.get('/', policyController.getPolicy);

router.get('/policyNo=:policyNo', policyController.getPolicyWithNo);
router.get('/agentNo=:agentNo', policyController.getPoliciesWithAgent);
router.get('/customerNo=:customerNo', policyController.getPoliciesWithCustomer);

router.put('/:policyNo', policyController.updatePolicyByNo);

router.delete('/:policyNo', policyController.deletePolicyByNo);

router.post('/', policyController.savePolicy);

module.exports = router;