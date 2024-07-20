const express = require('express');
const router = express.Router();
const carMarkController = require('../controllers/car.mark.controller.js');

router.get('/', carMarkController.getCarMarks);

module.exports = router;