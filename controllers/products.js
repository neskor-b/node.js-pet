const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { docTitle: 'Add Product', path: '/admin/add-product', activeAddProduct: true });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('shop', { prods: products, docTitle: 'Shop', path: '/', activeShop: true, hasProducts: products.length > 0 });
}
