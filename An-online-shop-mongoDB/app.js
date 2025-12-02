const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
const { cleanupAllCarts } = require('./util/cart-cleanup');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6600953027a481c4e0a5227c')
    .then(user => {
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
  console.log('Server running on http://localhost:3000');

  // Run cleanup immediately on startup
  cleanupAllCarts();

  // Schedule cleanup every 24 hours (86400000 ms)
  // For 7 days use: 7 * 24 * 60 * 60 * 1000
  const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
  // const CLEANUP_INTERVAL = 7 * 24 * 60 * 60 * 1000; // 7 days

  setInterval(() => {
    console.log('[Scheduler] Running cart cleanup...');
    cleanupAllCarts();
  }, CLEANUP_INTERVAL);
});
