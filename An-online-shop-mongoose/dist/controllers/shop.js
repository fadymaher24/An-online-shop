"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postOrder = exports.postCartDeleteProduct = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res, next) => {
    product_1.default.find()
        .then(products => {
        console.log(products);
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    })
        .catch(err => {
        console.log(err);
    });
};
exports.getProducts = getProducts;
const getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    product_1.default.findById(prodId)
        .then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product ? product.title : '',
            path: '/products',
        });
    })
        .catch(err => console.log(err));
};
exports.getProduct = getProduct;
const getIndex = (req, res, next) => {
    product_1.default.find()
        .then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    })
        .catch(err => {
        console.log(err);
    });
};
exports.getIndex = getIndex;
const getCart = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/');
    }
    req.user
        .populate('cart.items.productId')
        .then((user) => {
        console.log(user.cart.items);
        const Products = user.cart.items;
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: Products,
        });
    })
        .catch((err) => console.log(err));
};
exports.getCart = getCart;
const postCart = (req, res, next) => {
    const prodId = req.body.productId;
    product_1.default.findById(prodId)
        .then(product => {
        if (!product) {
            throw new Error('Product not found');
        }
        if (!req.user) {
            throw new Error('User not found');
        }
        return req.user.addToCart(product);
    })
        .then(result => {
        console.log(result);
        res.redirect('/cart');
    })
        .catch(err => console.log(err));
};
exports.postCart = postCart;
const postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    if (!req.user) {
        return res.redirect('/');
    }
    req.user
        .removeFromCart(prodId)
        .then(result => {
        console.log(result);
        res.redirect('/cart');
    })
        .catch(err => console.log(err));
};
exports.postCartDeleteProduct = postCartDeleteProduct;
const postOrder = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/');
    }
    req.user
        .addOrder()
        .then(result => {
        console.log(result);
        res.redirect('/orders');
    })
        .catch(err => console.log(err));
};
exports.postOrder = postOrder;
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
