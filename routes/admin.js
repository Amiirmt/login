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

module.exports = router;