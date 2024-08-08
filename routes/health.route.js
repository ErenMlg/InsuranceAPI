const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller.js');

router.get('/', healthController.getHealth);
router.get('/:id', healthController.getHealthWithID);
router.put('/:id', healthController.updateHealth);
router.delete('/:id', healthController.deleteHealth);
router.post('/', healthController.postHealth);

module.exports = router;