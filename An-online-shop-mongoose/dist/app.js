"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const error_1 = require("./controllers/error");
const user_1 = __importDefault(require("./models/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    user_1.default.findById('6600953027a481c4e0a5227c')
        .then(user => {
        req.user = user;
        next();
    })
        .catch(err => console.log(err));
});
app.use('/admin', admin_1.default);
app.use(shop_1.default);
app.use(express_1.default.static('src/public'));
app.use(error_1.get404);
mongoose_1.default.connect('mongodb+srv://fadyy:11223344Fff@cluster0.uz4c3us.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
    console.log('Connected to Mongoose');
    user_1.default.findOne().then(user => {
        if (!user) {
            const user = new user_1.default({
                name: 'Fady',
                email: 'fady@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });
    app.listen(3000);
})
    .catch(err => {
    console.log("Error connected to Mongoose:", err);
});
