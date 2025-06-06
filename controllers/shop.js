const Product = require('../models/product');
const path = require('../util/path');

exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('shop/product-list', { 
        prods: products, 
        pageTitle: 'All products', 
        path: '/products', 
        activeShop: true, 
        hasProducts: products.length > 0 
    });
}

exports.getProduct = async (req, res, next) => {
    const prodId = req.params.productId;
    const product = await Product.findById(prodId);
    res.render('shop/product-detail', {
        product: product,
    });
}

exports.getIndex = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('shop/index', { 
        prods: products, 
        pageTitle: 'Shop', 
        path: '/', 
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart', 
        path: '/cart', 
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
    });
}
