const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product', activeAddProduct: true });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body);
    product.save();
    res.redirect('/');
}

exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('admin/products', { 
        prods: products, 
        pageTitle: 'Admin products', 
        path: '/admin/products', 
        activeShop: true, 
        hasProducts: products.length > 0 
    });
}