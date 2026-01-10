const { v4 } = require('uuid');
const constants = require('./constants');
const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
  constructor({ title, imageUrl, description, price }) {
    this.id = Math.random().toString();
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {

  }
  static update(product) {

  }
  static fetchAll() {
    console.log('fetchAll called');
    return db.query('SELECT * FROM products');
  }

  static findById(id) {

  }
  static deleteById(id) {

  }
};

