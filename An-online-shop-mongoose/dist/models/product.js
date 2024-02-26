"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model('Product', productSchema);
// import { getDb } from '../util/database';
// interface ProductData {
//   title: string;
//   price: number;
//   description: string;
//   imageUrl: string;
//   _id?: ObjectId | null;
//   userId: string;
// }
// class Product {
//   title: string;
//   price: number;
//   description: string;
//   imageUrl: string;
//   _id: ObjectId | null;
//   userId: string;
//   constructor(title: string, price: number, description: string, imageUrl: string, id: string | null, userId: string) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new ObjectId(id) : null;
//     this.userId = userId;
//   }
//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne({ ...this, _id: undefined });
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   static findById(prodId: string) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new ObjectId(prodId) })
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   static deleteById(prodId: string) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new ObjectId(prodId) })
//       .then(result => {
//         console.log('Deleted');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }
// export default Product;
