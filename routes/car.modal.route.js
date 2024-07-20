const express = require('express');
const router = express.Router();
const carModalController = require('../controllers/car.modal.controller.js');

router.get('/', carModalController.getCarModals);

module.exports = router;