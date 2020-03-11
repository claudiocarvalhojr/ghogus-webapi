const mongoClient = require('mongodb').MongoClient;

if (process.env.NODE_ENV === 'production') {
    mongoClient.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DATABASE, { useUnifiedTopology: true })
        .then(conn => global.conn = conn.db(process.env.DATABASE))
        .catch(err => console.log(err));
}
else if (process.env.NODE_ENV === 'development') {
    mongoClient.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DATABASE, { useUnifiedTopology: true })
        .then(conn => global.conn = conn.db(process.env.DATABASE))
        .catch(err => console.log(err));
}

const ObjectId = require('mongodb').ObjectId;

function findCustomers(collection, callback) {
    global.conn.collection(collection).find().toArray(callback) 
}

function findCustomer(collection, id, callback) {
    global.conn.collection(collection).findOne(new ObjectId(id), callback)
}

function insertCustomer(collection, customer, callback) {
    global.conn.collection(collection).insertOne(customer, callback);
}

function updateCustomer(collection, id, customer, callback) {
    global.conn.collection(collection).updateOne({ _id: new ObjectId(id) }, customer, callback)
}

function patchCustomer(collection, id, updates, callback) {
    global.conn.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: updates }, callback)
}

function deleteCustomer(collection, id, callback) {
    global.conn.collection(collection).deleteOne({ _id: new ObjectId(id) }, callback)
}

module.exports = { findCustomers, findCustomer, insertCustomer, updateCustomer, patchCustomer, deleteCustomer }