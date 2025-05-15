const Product = require('../models/product');
const path = require('../util/path');

exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('shop/product-list', { 
        prods: products, 
        docTitle: 'All products', 
        path: '/products', 
        activeShop: true, 
        hasProducts: products.length > 0 
    });
}

exports.getIndex = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('shop/index', { 
        prods: products, 
        docTitle: 'Shop', 
        path: '/', 
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        docTitle: 'Your Cart', 
        path: '/cart', 
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path: '/checkout',
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        docTitle: 'Orders',
        path: '/orders',
    });
}
