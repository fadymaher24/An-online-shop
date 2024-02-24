import { MongoClient, Db } from 'mongodb';

let _db: Db;

const mongoConnect = (callback: () => void) => {
  MongoClient.connect('mongodb+srv://<username>:<password>@cluster0.gzorwf5.mongodb.net/')
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

const getDb = (): Db => {
  if (_db) {
    return _db;
  }
  throw new Error('No database found!');
};

export { mongoConnect, getDb };
