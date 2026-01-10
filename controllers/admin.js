const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    product: null,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
  }
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

exports.postDeleteProduct = async (req, res, next) => {
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
  try {
    const [products] = await Product.fetchAll();
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin products',
      path: '/admin/products',
    });
  } catch (err) {
    console.log(err);
  }
};
