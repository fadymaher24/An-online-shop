"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const error_1 = __importDefault(require("./controllers/error"));
const database_1 = require("./util/database");
const user_1 = __importDefault(require("./models/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((req, res, next) => {
    user_1.default.findById('5baa2528563f16379fc8a610')
        .then(user => {
        if (!user) {
            throw new Error('User not found');
        }
        req.user = new user_1.default(user.name, user.email, user.cart, user._id);
        next();
    })
        .catch(err => console.log(err));
});
app.use('/admin', admin_1.default);
app.use(shop_1.default);
app.use(error_1.default.get404);
(0, database_1.mongoConnect)(() => {
    app.listen(3000);
});
