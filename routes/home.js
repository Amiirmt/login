const express = require('express');

const router = express.Router();

const homecontroll = require('../controllers/home');

router.get('/home',homecontroll.gethome);


module.exports = router;