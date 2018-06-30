const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connection URL
const url = 'mongodb://root:example@localhost';
const dbName = 'test';
const customersCollection = 'customers';
const accountsCollection = 'accounts';
const transactionsCollection = 'transactions';

module.exports.getCustomers = function(callback) {
    getAll(customersCollection, callback);
};

module.exports.getCustomer = function(id, callback) {
    getById(customersCollection, id, callback);
};

module.exports.getAccounts = function(callback) {
    getAll(accountsCollection, callback);
};

module.exports.getAccount = function(id, callback) {
    getById(accountsCollection, id, callback);
};

module.exports.getTransactions = function(callback) {
    getAll(transactionsCollection, callback);
};

module.exports.getTransaction = function(id, callback) {
    getById(transactionsCollection, id, callback);
};

function getAll(collectionName, callback) {
    MongoClient.connect(url, function (err, client) {
        if (err)
            return callback(err, null);
        const db = client.db(dbName);
        db.collection(collectionName).find({}).toArray(function (err, result) {
            if (err)
                return callback(err, null);
            client.close();
            callback(null, result);
        });
    });
}

function getById(collectionName, id, callback) {
    MongoClient.connect(url, function (err, client) {
        if (err)
            return callback(err, null);
        const db = client.db(dbName);
        db.collection(collectionName).findOne({ _id: ObjectID.createFromHexString(id) }, function (err, result) {
            console.log('result:' + result);
            if (err)
                return callback(err, null);
            client.close();
            callback(null, result);
        });
    });
}

