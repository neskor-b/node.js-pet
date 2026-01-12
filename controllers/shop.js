const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All products',
      path: '/products',
      activeShop: true,
      hasProducts: products.length > 0,
    });
  } catch (err) {
    next(err)
  }
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findById(prodId);
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products',
    });
  } catch (err) {
    next(err)
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  } catch (err) {
    next(err)
  }
};

exports.getCart = async (req, res, next) => {
  const cart = await Cart.getCart();
  const products = await Product.fetchAll();
  const cartProducts = cart?.products?.map((cartProduct) => {
    const product = products.find((p) => p.id === cartProduct.id);
    return { ...product, quantity: cartProduct.quantity };
  });

  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
    products: cartProducts,
  });
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  await Cart.addProduct(prodId, product.price);
  res.redirect('/cart');
};

exports.postCartDelete = async (req, res, next) => {
  const prodId = req.body.id;
  const product = await Product.findById(prodId);
  await Cart.deleteProduct(prodId, product.price);
  res.redirect('/cart');
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  });
};
