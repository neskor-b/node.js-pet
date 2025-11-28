const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    product: null,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findById(prodId);
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    product: product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.body.id;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
}

exports.postEditProduct = (req, res, next) => {
  Product.update({
    id: req.params.productId,
    ...req.body,
  });
  res.redirect('/admin/products');
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin products',
    path: '/admin/products',
  });
};
