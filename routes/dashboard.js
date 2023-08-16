const express = require('express');

const router = express.Router();

const dashboardcontroll = require('../controllers/dashboard');


router.get('/dashboard/:userid', dashboardcontroll.getdashboard);



module.exports = router;