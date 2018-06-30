const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connection URL
const url = 'mongodb://root:example@localhost';
const dbName = 'test';
const customersCollection = 'customers';
const accountsCollection = 'accounts';
const transactionsCollection = 'transactions';

module.exports.getCustomers = function(callback) {
    findAll(customersCollection, query, callback);
};

module.exports.getCustomer = function(id, callback) {
    findOneById(customersCollection, id, callback);
};

module.exports.getAccounts = function(callback) {
    findAll(accountsCollection, callback);
};

module.exports.getAccount = function(id, callback) {
    findOneById(accountsCollection, id, callback);
};

module.exports.getAccountForCustomer = function(customerId, callback) {
    var query = { customerId: customerId };
    find(accountsCollection, query, callback);
};

module.exports.getTransactions = function(callback) {
    findAll(transactionsCollection, callback);
};

module.exports.getTransaction = function(id, callback) {
    findOneById(transactionsCollection, id, callback);
};

function find(collectionName, query, callback) {
    MongoClient.connect(url, function (err, client) {
        if (err)
            return callback(err, null);
        const db = client.db(dbName);
        db.collection(collectionName).find(query).toArray(function (err, result) {
            if (err)
                return callback(err, null);
            client.close();
            callback(null, result);
        });
    });
}

function findAll(collectionName, callback){
    var query = {};
    find(collectionName, query, callback);
}

function findOneById(collectionName, id, callback) {
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

