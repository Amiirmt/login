const express = require('express');

const router = express.Router();

const shopcontroll = require('../controllers/shop');




router.post('/shop/', shopcontroll.postcart);


router.get('/shop/myshopping',shopcontroll.getmyshopping);

router.delete('/shop/myshopping', shopcontroll.deletecart);





module.exports = router;