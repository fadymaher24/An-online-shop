import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import errorController from './controllers/error';
import { mongoConnect } from './util/database';
import User from './models/user';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req: Request, res: Response, next: NextFunction) => {
  User.findById('5baa2528563f16379fc8a610')
    .then(user => {
      if (!user) {
        throw new Error('User not found');
      }
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
