const express = require('express');
const router = express.Router();
const trafficController = require('../controllers/traffic.controller.js');

router.get('/', trafficController.getCars);
router.get('/:id', trafficController.getCarsWithID);
router.put('/:id', trafficController.updateCar);
router.delete('/:id', trafficController.deleteCar);
router.post('/', trafficController.postCar);

module.exports = router;