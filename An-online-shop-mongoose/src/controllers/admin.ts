import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';

export const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

  export const postAddProduct = (req: Request, res: Response, next: NextFunction) => {
    const title = (req.body as { title: string })?.title; // Parse req.body as an object with a 'title' property of type string
    const imageUrl = (req.body as { imageUrl: string })?.imageUrl; // Parse req.body as an object with an 'imageUrl' property of type string
    const price = (req.body as { price: number })?.price; // Parse req.body as an object with a 'price' property of type number
    const description = (req.body as { description: string })?.description; // Parse req.body as an object with a 'description' property of type string
    const product = new Product({
      title: title,
      price: price,
      description: description,
      imageUrl:imageUrl,
      userId: (req as Request & { user: string }).user
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

export const getEditProduct = (req: Request, res: Response, next: NextFunction) => {

  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
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

export const postEditProduct = (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
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

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.find()
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

export const postDeleteProduct = (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
