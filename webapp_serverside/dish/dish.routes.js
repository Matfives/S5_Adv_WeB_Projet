const express = require('express');
const dishController = require('./dish.controller');

const router = express.Router();

router.get('/', dishController.getDishes);
router.get('/:id', dishController.getDish);
router.post('/', dishController.createDish);
router.put('/:id', dishController.updateDish);
router.delete('/:id', dishController.deleteDish);

module.exports = router;