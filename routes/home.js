const express = require('express');

const router = express.Router();

const homecontroll = require('../controllers/home');

router.get('/home',homecontroll.gethome);

router.get('/home/showpakage',homecontroll.showpakage);

router.get('/home/singlepakage/:pakageid',homecontroll.singlepakage);



module.exports = router;