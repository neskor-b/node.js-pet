const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const constants = require('./constants');

module.exports = class Cart {
  static async addProduct(id, productPrice) {
    let cart = { products: [], totalPrice: 0 };

    try {
      const fileContent = await fs.promises.readFile(constants.CART_PATH);
      cart = JSON.parse(fileContent);
    } catch (err) {
      console.log(err);
    }

    const existingProductIndex = cart.products.findIndex(
      (prod) => prod.id === id,
    );
    const existingProduct = cart.products[existingProductIndex];
    let updatedProduct;

    if (existingProduct) {
      updatedProduct = {
        ...existingProduct,
        quantity: existingProduct.quantity + 1,
      };
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      updatedProduct = { id: id, quantity: 1 };
      cart.products = [...cart.products, updatedProduct];
    }

    cart.totalPrice += Number(productPrice);
    return fs.promises.writeFile(constants.CART_PATH, JSON.stringify(cart));
  }
};
