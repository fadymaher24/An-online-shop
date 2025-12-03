import mongoose, { Document } from 'mongoose';
import { ProductDocument } from './product';

const Schema = mongoose.Schema;

export interface User extends Document {
  name: string;
  email: string;
  cart: {
    items: {
      productId: mongoose.Schema.Types.ObjectId;
      quantity: number;
    }[];
  };
  addToCart(product: ProductDocument): Promise<User>;
  removeFromCart(productId: string): Promise<User>;
  addOrder(): Promise<void>;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (
  product: ProductDocument
): Promise<User> {
  const cartProductIndex = this.cart.items.findIndex((cp: any) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (
  productId: mongoose.Types.ObjectId
) {
  const updatedCartItems = this.cart.items.filter((item: any) => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.addOrder = async function (): Promise<void> {
  const db = mongoose.connection; // Use mongoose's connection to interact with the database
  const order = {
    items: this.cart.items,
    user: {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
  };

  // Add the order to the orders collection
  await db.collection('orders').insertOne(order);

  // Clear the user's cart
  this.cart = { items: [] };
  await this.save();
};

userSchema.methods.getOrder = function ()

export default mongoose.model<User>('User', userSchema);

// interface CartItem {
//   productId: ObjectId;
//   quantity: number;
// }

// interface Cart {
//   items: CartItem[];
// }

// interface Order {
//   items: Product[];
//   user: {
//     _id: ObjectId;
//     name: string;
//   };
// }

//   deleteItemFromCart(productId: string) {
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString();
//     });
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then(products => {
//         const order: Order = {
//           items: products,
//           user: {
//             _id: new ObjectId(this._id),
//             name: this.name
//           }
//         };
//         return db.collection('orders').insertOne(order);
//       })
//       .then(result => {
//         this.cart = { items: [] };
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection('orders')
//       .find({ 'user._id': new ObjectId(this._id) })
//       .toArray();
//   }

//   static findById(userId: string) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new ObjectId(userId) })
//       .then(user => {
//         console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }
