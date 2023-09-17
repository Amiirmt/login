const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer({dest:'./uploads/'})
const dashboardcontroll = require('../controllers/dashboard');




router.get('/dashboard/:userid', dashboardcontroll.getdashboard);

router.get('/dashboard/:userid/joinexam', dashboardcontroll.joinexam);

router.post('/dashboard/:userid/joinexam',dashboardcontroll.uploadexam);

router.put('/dashboard/:userid/joinexam',dashboardcontroll.updateupload);

router.post('/dashboard/:userid',dashboardcontroll.createexam);

router.put('/dashboard/:userid', dashboardcontroll.updateexam);

router.delete('/dashboard/:userid', dashboardcontroll.deletedexam);





module.exports = router;