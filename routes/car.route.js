const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller.js');

router.get('/', carController.getCars);
router.get('/:id', carController.getCarsWithID);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);
router.post('/', carController.postCar);

module.exports = router;