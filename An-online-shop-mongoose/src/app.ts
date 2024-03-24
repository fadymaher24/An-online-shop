import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { get404 } from './controllers/error';
import { mongoConnect } from './util/database';
// import User from './models/user';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(bodyParser.urlencoded({ extended: false }));
interface CustomRequest extends Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
  // user: User;
}

// app.use((req: Request, res: Response, next: NextFunction) => {
//   User.findById('5baa2528563f16379fc8a610')
//     .then(user => {
//       if (!user) {
//         throw new Error('User not found');
//       }
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(express.static('src/public'))

app.use(get404);

mongoose.connect('mongodb+srv://fadyy:11223344Fff@cluster0.uz4c3us.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
)
.then(() => {
console.log('Connected to Mongoose');
app.listen(3000)
})

.catch(err => {
  console.log("Error connected to Mongoose:", err);
});