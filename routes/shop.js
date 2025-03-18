const express = require('express');

const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
  res.render('shop', { prods: adminData.products, docTitle: 'Shop', path: '/', activeShop: true, hasProducts: adminData.products.length > 0 });
});

module.exports = router;
