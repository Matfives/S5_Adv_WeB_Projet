const express = require('express');
const c = require('./user.controller');

const router = express.Router();

router.get('/', c.getUsers);
router.get('/:id', c.getUser);
router.post('/', c.createUser);
router.put('/:id', c.updateUser);
router.delete('/:id', c.deleteUser);

module.exports = router;