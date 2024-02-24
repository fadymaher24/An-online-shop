"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.mongoConnect = void 0;
const mongodb_1 = require("mongodb");
let _db;
const mongoConnect = (callback) => {
    mongodb_1.MongoClient.connect('mongodb+srv://<username>:<password>@cluster0.gzorwf5.mongodb.net/')
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
exports.mongoConnect = mongoConnect;
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw new Error('No database found!');
};
exports.getDb = getDb;
