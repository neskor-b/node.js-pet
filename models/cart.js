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

  static async deleteProduct(id, productPrice) {
    try {
      const fileContent = await fs.promises.readFile(constants.CART_PATH);
      const cart = JSON.parse(fileContent);
      const product = cart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.quantity;
      cart.products = cart.products.filter((prod) => prod.id !== id);
      cart.totalPrice -= productPrice * productQty;
      return fs.promises.writeFile(constants.CART_PATH, JSON.stringify(cart));
    } catch (err) {
      console.log(err);
    }
  }
};
