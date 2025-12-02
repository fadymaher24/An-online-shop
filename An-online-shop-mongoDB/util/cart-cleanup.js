const mongodb = require('mongodb');
const getDb = require('./database').getDb;

const ObjectId = mongodb.ObjectId;

const cleanupAllCarts = async () => {
  const db = getDb();

  try {
    // Get all existing product IDs
    const products = await db
      .collection('products')
      .find({}, { projection: { _id: 1 } })
      .toArray();
    const validProductIds = products.map(p => p._id.toString());

    // Get all users with non-empty carts
    const users = await db
      .collection('users')
      .find({ 'cart.items.0': { $exists: true } })
      .toArray();

    let totalCleaned = 0;

    for (const user of users) {
      const originalLength = user.cart.items.length;

      // Filter out invalid products
      const validCartItems = user.cart.items.filter(item =>
        validProductIds.includes(item.productId.toString())
      );

      // Update if items were removed
      if (validCartItems.length !== originalLength) {
        await db
          .collection('users')
          .updateOne(
            { _id: user._id },
            { $set: { cart: { items: validCartItems } } }
          );
        totalCleaned += originalLength - validCartItems.length;
      }
    }

    console.log(
      `[Cart Cleanup] Removed ${totalCleaned} invalid items from ${users.length} users`
    );
    return totalCleaned;
  } catch (err) {
    console.error('[Cart Cleanup] Error:', err);
    throw err;
  }
};

module.exports = { cleanupAllCarts };
