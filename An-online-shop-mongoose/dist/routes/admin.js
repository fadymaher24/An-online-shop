"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import * as adminController from '../controllers/admin';
const router = express_1.default.Router();
// /admin/add-product => GET
// router.get('/add-product', adminController.getAddProduct);
// // /admin/products => GET
// router.get('/products', adminController.getProducts);
// // /admin/add-product => POST
// router.post('/add-product', adminController.postAddProduct);
// router.get('/edit-product/:productId', adminController.getEditProduct);
// router.post('/edit-product', adminController.postEditProduct);
// router.post('/delete-product', adminController.postDeleteProduct);
exports.default = router;
