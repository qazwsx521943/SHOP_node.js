const db = require('../util/database');

module.exports = class Product{
    constructor(id, productName, imageUrl, description, price){
        this.id = id;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.desciption = description;
        this.price = price;
    }

    static fetchAll(){
        db.execute('SELECT * FROM products');
    }
}