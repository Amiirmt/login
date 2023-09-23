const express = require('express');
const router = express.Router();
const admincontroll = require('../controllers/admin');



router.get('/signup', admincontroll.getsignup);

router.post('/signup', admincontroll.postsignup);

router.get('/login', admincontroll.getlogin);

router.post('/login', admincontroll.postlogin);


 

router.get('/admin/addpakage', admincontroll.getpakage);

router.post('/admin/addpakage', admincontroll.addpakage);

router.put('/admin/addpakage/:pakageid', admincontroll.updatepakage);

router.delete('/admin/addpakage/:pakageid', admincontroll.deletepakage);



router.get('/admin/addteacher',admincontroll.getteacher);

router.post('/admin/addteacher',admincontroll.addteacher);

router.put('/admin/updateteacher/:userid',admincontroll.updeteteacher);

router.delete('/admin/deleteteacher',admincontroll.deleteteacher);




router.get('/admin/addcourse',admincontroll.getcourse);

router.post('/admin/addcourse',admincontroll.addcourse);

router.delete('/admin/deletecourse',admincontroll.deletecorse);




router.get('/admin/orders',admincontroll.getorder);

module.exports = router;
