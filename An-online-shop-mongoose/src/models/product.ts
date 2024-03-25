import mongoose, { Schema, Document } from 'mongoose';


export interface ProductDocument extends Document {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: Schema.Types.ObjectId;
  _id?: string;
}


const productSchema = new Schema<ProductDocument>({
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
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Mongoose will automatically create a collection called 'products' based on the model name 'Product' 
export default mongoose.model<ProductDocument>('Product', productSchema);
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
