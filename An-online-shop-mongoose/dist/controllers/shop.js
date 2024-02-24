"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.postOrder = exports.postCartDeleteProduct = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
const product_1 = require("../models/product");
const getProducts = (req, res, next) => {
    product_1.Product.findAll()
        .then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    })
        .catch(err => {
        console.log(err);
    });
};
exports.getProducts = getProducts;
const getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // Product.findAll({ where: { id: prodId } })
    //   .then(products => {
    //     res.render('shop/product-detail', {
    //       product: products[0],
    //       pageTitle: products[0].title,
    //       path: '/products'
    //     });
    //   })
    //   .catch(err => console.log(err));
    product_1.Product.findById(prodId)
        .then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    })
        .catch(err => console.log(err));
};
exports.getProduct = getProduct;
const getIndex = (req, res, next) => {
    product_1.Product.findAll()
        .then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    })
        .catch(err => {
        console.log(err);
    });
};
exports.getIndex = getIndex;
const getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
        return cart
            .getProducts()
            .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
            .catch(err => console.log(err));
    })
        .catch(err => console.log(err));
};
exports.getCart = getCart;
const postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId } });
    })
        .then(products => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return product_1.Product.findById(prodId);
    })
        .then(product => {
        return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity }
        });
    })
        .then(() => {
        res.redirect('/cart');
    })
        .catch(err => console.log(err));
};
exports.postCart = postCart;
const postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
        return cart.getProducts({ where: { id: prodId } });
    })
        .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
        .then(result => {
        res.redirect('/cart');
    })
        .catch(err => console.log(err));
};
exports.postCartDeleteProduct = postCartDeleteProduct;
const postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
        .then(products => {
        return req.user
            .createOrder()
            .then(order => {
            return order.addProducts(products.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity };
                return product;
            }));
        })
            .catch(err => console.log(err));
    })
        .then(result => {
        return fetchedCart.setProducts(null);
    })
        .then(result => {
        res.redirect('/orders');
    })
        .catch(err => console.log(err));
};
exports.postOrder = postOrder;
const getOrders = (req, res, next) => {
    req.user
        .getOrders({ include: ['products'] })
        .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
        });
    })
        .catch(err => console.log(err));
};
exports.getOrders = getOrders;
