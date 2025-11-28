const fs = require('fs');
const { v4 } = require('uuid');
const constants = require('./constants');

module.exports = class Product {
  constructor({ title, imageUrl, description, price }) {
    this.id = Math.random().toString();
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    this.id = v4();
    return saveProductsToFile(this);
  }
  static update(product) {
    return updateProduct(product);
  }
  static fetchAll() {
    return getProductsFromFile();
  }
  static findById(id) {
    return getProductsFromFile().then((products) => {
      return products.find((p) => p.id === id);
    });
  }
  static deleteById(id) {
    return deleteProduct(id);
  }
};

function getProductsFromFile() {
  return fs.promises
    .readFile(constants.PRODUCTS_PATH)
    .then((fileContent) => {
      return JSON.parse(fileContent);
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

async function saveProductsToFile(product) {
  const allProducts = await getProductsFromFile();
  allProducts.push(product);
  fs.writeFile(constants.PRODUCTS_PATH, JSON.stringify(allProducts), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

async function updateProduct(product) {
  const allProducts = await getProductsFromFile();
  const index = allProducts.findIndex((p) => p.id === product.id);
  allProducts[index] = product;
  fs.writeFile(constants.PRODUCTS_PATH, JSON.stringify(allProducts), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

async function deleteProduct(id) {
  const allProducts = await getProductsFromFile();
  let deletedProduct;
  const updatedProducts = allProducts.filter((p) => {
    if (p.id !== id) {
      return true;
    } else {
      deletedProduct = p;
      return false;
    }
  });
  fs.writeFile(constants.PRODUCTS_PATH, JSON.stringify(updatedProducts), (err) => {
    if (err) {
      console.log(err);
    }
  })
  return deletedProduct;
}
