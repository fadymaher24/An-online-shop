"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const database_1 = require("../util/database");
class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb_1.ObjectId(id) : null;
        this.userId = userId;
    }
    save() {
        const db = (0, database_1.getDb)();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
                .collection('products')
                .updateOne({ _id: this._id }, { $set: this });
        }
        else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => {
            console.log(result);
        })
            .catch(err => {
            console.log(err);
        });
    }
    static fetchAll() {
        const db = (0, database_1.getDb)();
        return db
            .collection('products')
            .find()
            .toArray()
            .then(products => {
            console.log(products);
            return products;
        })
            .catch(err => {
            console.log(err);
        });
    }
    static findById(prodId) {
        const db = (0, database_1.getDb)();
        return db
            .collection('products')
            .find({ _id: new mongodb_1.ObjectId(prodId) })
            .next()
            .then(product => {
            console.log(product);
            return product;
        })
            .catch(err => {
            console.log(err);
        });
    }
    static deleteById(prodId) {
        const db = (0, database_1.getDb)();
        return db
            .collection('products')
            .deleteOne({ _id: new mongodb_1.ObjectId(prodId) })
            .then(result => {
            console.log('Deleted');
        })
            .catch(err => {
            console.log(err);
        });
    }
}
exports.default = Product;
