const express = require('express');
const c = require('./restaurant.controller');

const router = express.Router();

router.get('/', c.getRestaurants);
router.get('/:id', c.getRestaurant);
router.post('/', c.createRestaurant);
router.put('/:id', c.updateRestaurant);
router.delete('/:id', c.deleteRestaurant);

module.exports = router;