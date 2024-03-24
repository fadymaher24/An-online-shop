"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("./controllers/error");
// import User from './models/user';
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(body_parser_1.default.urlencoded({ extended: false }));
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
app.use('/admin', admin_1.default);
app.use(shop_1.default);
app.use(express_1.default.static('src/public'));
app.use(error_1.get404);
mongoose_1.default.connect('mongodb+srv://fadyy:11223344Fff@cluster0.uz4c3us.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
    console.log('Connected to Mongoose');
    app.listen(3000);
})
    .catch(err => {
    console.log("Error connected to Mongoose:", err);
});
