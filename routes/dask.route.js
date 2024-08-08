const express = require('express');
const router = express.Router();
const daskController = require('../controllers/dask.controller.js');

router.get('/', daskController.getDask);
router.get('/:id', daskController.getDaskWithID);
router.put('/:id', daskController.updateDask);
router.delete('/:id', daskController.deleteDask);
router.post('/', daskController.postDask);

module.exports = router;