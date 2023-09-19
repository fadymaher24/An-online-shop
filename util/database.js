const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
'mongodb+srv://fadyy:q8Ecp1qPrsTWFbc9@cluster0.gzorwf5.mongodb.net/?retryWrites=true&w=majority)')
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
