import { Request, Response, NextFunction } from 'express';


import Product  from '../models/product';

import  {User}  from '../models/user';
import { Document } from 'mongoose';
import { ProductDocument } from '../models/product';


export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.find()
    .then(products => {
      console.log(products);
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

export const getProduct = (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product ? product.title : '',
            path: '/products'
        });
    })
    .catch(err => console.log(err));
};

export const getIndex = (req: Request, res: Response, next: NextFunction) => {
  Product.find()
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

interface UserDocument extends User, Document {
  addToCart(product: ProductDocument): Promise<any>;
}


// customRequestHandler
interface CustomRequest extends Request {
  user?: UserDocument | null; // Update the type to match your User model
}


export const getCart = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.redirect('/');
  }

  req.user
    .populate('cart.items.productId')
    .then((user: UserDocument) => {
      console.log(user.cart.items);
      const Products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: Products
      });
    })
    .catch((err: any) => console.log(err));
};


export const postCart = (req: CustomRequest, res: Response, next: NextFunction) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
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
