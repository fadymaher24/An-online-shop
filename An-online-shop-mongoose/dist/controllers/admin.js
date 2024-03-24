"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteProduct = exports.getProducts = exports.postEditProduct = exports.getEditProduct = exports.postAddProduct = exports.getAddProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};
exports.getAddProduct = getAddProduct;
const postAddProduct = (req, res, next) => {
    var _a, _b, _c, _d;
    const title = (_a = req.body) === null || _a === void 0 ? void 0 : _a.title; // Parse req.body as an object with a 'title' property of type string
    const imageUrl = (_b = req.body) === null || _b === void 0 ? void 0 : _b.imageUrl; // Parse req.body as an object with an 'imageUrl' property of type string
    const price = (_c = req.body) === null || _c === void 0 ? void 0 : _c.price; // Parse req.body as an object with a 'price' property of type number
    const description = (_d = req.body) === null || _d === void 0 ? void 0 : _d.description; // Parse req.body as an object with a 'description' property of type string
    const product = new product_1.default({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    });
    product
        .save()
        .then(result => {
        // console.log(result);
        console.log('Created Product');
        res.redirect('/admin/products');
    })
        .catch(err => {
        console.log(err);
    });
};
exports.postAddProduct = postAddProduct;
const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    product_1.default.findById(prodId)
        // Product.findById(prodId)
        .then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
        .catch(err => console.log(err));
};
exports.getEditProduct = getEditProduct;
const postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    product_1.default.findById(prodId)
        .then(product => {
        if (product) {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            return product.save();
        }
    })
        .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
    })
        .catch(err => console.log(err));
};
exports.postEditProduct = postEditProduct;
const getProducts = (req, res, next) => {
    product_1.default.find()
        // .select('title price -_id')
        // .populate('userId', 'name')
        .then(products => {
        console.log(products);
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    })
        .catch(err => console.log(err));
};
exports.getProducts = getProducts;
const postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    product_1.default.findByIdAndDelete(prodId)
        .then(() => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/admin/products');
    })
        .catch(err => console.log(err));
};
exports.postDeleteProduct = postDeleteProduct;
