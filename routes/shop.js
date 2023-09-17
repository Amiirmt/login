const express = require('express');

const router = express.Router();

const shopcontroll = require('../controllers/shop');

router.post('/shop/:userid', shopcontroll.postcart);

module.exports = router;