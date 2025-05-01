const fs = require('fs');
const constants = require('./constants');


module.exports = class Product {
    constructor(t){
        this.title = t;
    }
    save(){
        return saveProductsToFile(this);
    }
    static fetchAll(){
        return getProductsFromFile()
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