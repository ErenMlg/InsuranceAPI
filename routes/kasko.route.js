const express = require('express');
const router = express.Router();
const kaskoController = require('../controllers/kasko.controller.js');

router.get('/', kaskoController.getCars);
router.get('/:id', kaskoController.getCarsWithID);
router.put('/:id', kaskoController.updateCar);
router.delete('/:id', kaskoController.deleteCar);
router.post('/', kaskoController.postCar);

module.exports = router;