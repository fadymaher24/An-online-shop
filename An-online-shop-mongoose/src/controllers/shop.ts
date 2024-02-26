// import { Request, Response, NextFunction } from 'express';


// import Product  from '../models/product';



// export const getProducts = (req: Request, res: Response, next: NextFunction) => {
//   Product.findAll()
//     .then(products => {
//       res.render('shop/product-list', {
//         prods: products,
//         pageTitle: 'All Products',
//         path: '/products'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// export const getProduct = (req: Request, res: Response, next: NextFunction) => {
//   const prodId = req.params.productId;
//   // Product.findAll({ where: { id: prodId } })
//   //   .then(products => {
//   //     res.render('shop/product-detail', {
//   //       product: products[0],
//   //       pageTitle: products[0].title,
//   //       path: '/products'
//   //     });
//   //   })
//   //   .catch(err => console.log(err));
//   Product.findById(prodId)
//     .then(product => {
//       res.render('shop/product-detail', {
//         product: product,
//         pageTitle: product.title,
//         path: '/products'
//       });
//     })
//     .catch(err => console.log(err));
// };

// export const getIndex = (req: Request, res: Response, next: NextFunction) => {
//   Product.findAll()
//     .then(products => {
//       res.render('shop/index', {
//         prods: products,
//         pageTitle: 'Shop',
//         path: '/'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// export const getCart = (req: Request, res: Response, next: NextFunction) => {
//   req.user
//     .getCart()
//     .then(cart => {
//       return cart
//         .getProducts()
//         .then(products => {
//           res.render('shop/cart', {
//             path: '/cart',
//             pageTitle: 'Your Cart',
//             products: products
//           });
//         })
//         .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));
// };

// export const postCart = (req: Request, res: Response, next: NextFunction) => {
//   const prodId = req.body.productId;
//   let fetchedCart;
//   let newQuantity = 1;
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then(products => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }

//       if (product) {
//         const oldQuantity = product.cartItem.quantity;
//         newQuantity = oldQuantity + 1;
//         return product;
//       }
//       return Product.findById(prodId);
//     })
//     .then(product => {
//       return fetchedCart.addProduct(product, {
//         through: { quantity: newQuantity }
//       });
//     })
//     .then(() => {
//       res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// };

// export const postCartDeleteProduct = (req: Request, res: Response, next: NextFunction) => {
//   const prodId = req.body.productId;
//   req.user
//     .getCart()
//     .then(cart => {
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then(products => {
//       const product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then(result => {
//       res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// };

// export const postOrder = (req: Request, res: Response, next: NextFunction) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then(products => {
//       return req.user
//         .createOrder()
//         .then(order => {
//           return order.addProducts(
//             products.map(product => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch(err => console.log(err));
//     })
//     .then(result => {
//       return fetchedCart.setProducts(null);
//     })
//     .then(result => {
//       res.redirect('/orders');
//     })
//     .catch(err => console.log(err));
// };

// export const getOrders = (req: Request, res: Response, next: NextFunction) => {
//   req.user
//     .getOrders({include: ['products']})
//     .then(orders => {
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders
//       });
//     })
//     .catch(err => console.log(err));
// };
