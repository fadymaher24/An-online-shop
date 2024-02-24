// Using mongodb
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    mongodb+srv://<username>:<password>@cluster0.gzorwf5.mongodb.net/
  )
.then(client => {
  console.log('Connected!');
  _db = client.db();
  callback();
})
.catch(err => {
  console.log(err);
  throw err;
});
};

const getDb = () => {
if (_db) {
return _db;
}
throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
