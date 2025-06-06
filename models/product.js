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
    save(){
        this.id = v4();
        return saveProductsToFile(this);
    }
    static fetchAll(){
        return getProductsFromFile()
    }
    static findById(id){
        return getProductsFromFile().then(products => {
            return products.find(p => p.id === id);
        });
    }
}

function getProductsFromFile() {
    return fs.promises.readFile(constants.PRODUCTS_PATH)
    .then(fileContent => {
        return JSON.parse(fileContent);
    })
    .catch(err => {
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