import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { get404 } from './controllers/error';
import { mongoConnect } from './util/database';
import User from './models/user';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Document } from 'mongoose';
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(bodyParser.urlencoded({ extended: false }));

interface CustomRequest extends Request {
  user?: Document<any, any> | null; // Update the type to match your User model
}

app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  User.findById('6600953027a481c4e0a5227c')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(express.static('src/public'))

app.use(get404);

mongoose.connect('mongodb+srv://fadyy:11223344Fff@cluster0.uz4c3us.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0',
)
.then(() => {
console.log('Connected to Mongoose');
User.findOne().then(user => {
  if (!user) {
      const user = new User({
        name: 'Fady',
        email: 'fady@test.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
    });
app.listen(3000)
})

.catch(err => {
  console.log("Error connected to Mongoose:", err);
});