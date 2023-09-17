const express = require('express');

const router = express.Router();

const shopcontroll = require('../controllers/shop');

router.post('/shop/', shopcontroll.postcart);

router.delete('/shop/', shopcontroll.deletecart);

module.exports = router;