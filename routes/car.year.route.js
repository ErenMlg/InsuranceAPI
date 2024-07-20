const express = require('express');
const router = express.Router();
const carYearController = require('../controllers/car.year.controller.js');

router.get('/', carYearController.getCarYears);

module.exports = router;