const { v4 } = require('uuid');
const constants = require('./constants');
const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
  constructor({ title, imageUrl, description, price }) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    return db.execute('INSERT INTO PRODUCTS (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', 
      [this.title, this.price, this.imageUrl, this.description]
    )
  }
  static update(product) {

  }
  static async fetchAll() {
    const [products] = await db.execute('SELECT * FROM products');
    return products;
  }

  static async findById(id) {
    const [[product]] = await db.execute('SELECT * FROM products WHERE products.id = ?', [id])
    return product;
  }
  static deleteById(id) {

  }
};

