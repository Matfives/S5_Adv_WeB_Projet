const express = require('express');
const dishController = require('../controllers/dishController');

const router = express.Router();

router.get('/', dishController.getDishes);

module.exports = router;
