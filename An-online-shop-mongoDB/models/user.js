const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(i => i.productId);

    if (productIds.length === 0) {
      return Promise.resolve([]);
    }

    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        // Find valid product IDs that still exist
        const validProductIds = products.map(p => p._id.toString());

        // Filter out cart items for deleted products
        const validCartItems = this.cart.items.filter(item =>
          validProductIds.includes(item.productId.toString())
        );

        // If some items were removed, update the cart in database
        if (validCartItems.length !== this.cart.items.length) {
          this.cart.items = validCartItems;
          db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: validCartItems } } }
          );
        }

        return products.map(p => {
          return {
            ...p,
            quantity: validCartItems.find(
              i => i.productId.toString() === p._id.toString()
            ).quantity,
          };
        });
      });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getDb();
    return this.getCart().then(products => {
      const order = {
        items: this.cart.items,
        user: { _id: new ObjectId(this._id), name: this.name },
      };
      return db
        .collection('orders')
        .insertOne(order)
        .then(result => {
          this.cart = { items: [] };
          return db
            .collection('users')
            .updateOne(
              { _id: new ObjectId(this._id) },
              { $set: { cart: { items: [] } } }
            );
        });
    });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection('orders')
      .find({ 'user._id': new ObjectId(this._id) })
      .toArray();
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
