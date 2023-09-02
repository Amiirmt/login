const express = require('express');

const router = express.Router();

const admincontroll = require('../controllers/admin');

router.get('/signup', admincontroll.getsignup);

router.post('/signup', admincontroll.postsignup);

router.get('/login', admincontroll.getlogin);

router.post('/login', admincontroll.postlogin);

router.get('/admin/addpakage/:userid', admincontroll.getaddpakage);

router.post('/admin/addpakage', admincontroll.postaddpakage);



module.exports = router;