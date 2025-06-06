const path = require('path');
const rootDir = require('../util/path');

const PRODUCTS_PATH = path.join(rootDir, 'data', 'products.json');
const CART_PATH = path.join(rootDir, 'data', 'cart.json');

module.exports = {
  PRODUCTS_PATH,
  CART_PATH,
};
