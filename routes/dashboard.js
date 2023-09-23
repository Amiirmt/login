const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer({dest:'./uploads/'})
const dashboardcontroll = require('../controllers/dashboard');



router.get('/dashboard/:userid', dashboardcontroll.getdashboard);



router.get('/dashboard/:userid/createexam',dashboardcontroll.getexam);

router.post('/dashboard/:userid/createexam',dashboardcontroll.createexam);

router.put('/dashboard/:userid/createexam', dashboardcontroll.updateexam);

router.delete('/dashboard/:userid/createexam', dashboardcontroll.deletedexam);



router.get('/dashboard/:userid/studentexam', dashboardcontroll.getshow_studentuploads);




router.get('/dashboard/:userid/joinexam', dashboardcontroll.joinexam);

router.post('/dashboard/:userid/joinexam',dashboardcontroll.uploadexam);

router.put('/dashboard/:userid/joinexam',dashboardcontroll.updateupload);


router.get('/dashboard/:userid/mypakage',dashboardcontroll.getmypakage);


module.exports = router;