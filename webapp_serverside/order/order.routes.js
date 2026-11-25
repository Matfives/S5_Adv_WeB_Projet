const express = require('express');
const c = require('./order.controller');

const router = express.Router();

router.get('/', c.getOrders);
router.post('/', c.createOrder);
router.get('/:userId/:dishId', c.getOrder);
router.put('/:userId/:dishId', c.updateOrder);
router.delete('/:userId/:dishId', c.deleteOrder);

module.exports = router;