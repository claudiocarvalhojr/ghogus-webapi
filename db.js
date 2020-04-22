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

function findAll(collection, callback) {
    global.conn.collection(collection).find().toArray(callback) 
}

function findLast(collection, param, callback) {
    global.conn.collection(collection).find().sort(param).limit(1).toArray(callback)
}

function findOne(collection, id, callback) {
    global.conn.collection(collection).findOne(new ObjectId(id), callback)
}

function findSKU(collection, sku, callback) {
    global.conn.collection(collection).find({'sku': sku}).sort({'sku': 1}).limit(1).toArray(callback)
}

function insertOne(collection, object, callback) {
    global.conn.collection(collection).insertOne(object, callback);
}

function updateOne(collection, id, object, callback) {
    global.conn.collection(collection).updateOne({ _id: new ObjectId(id) }, object, callback)
}

function patchOne(collection, id, updates, callback) {
    global.conn.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: updates }, callback)
}

function deleteOne(collection, id, callback) {
    global.conn.collection(collection).deleteOne({ _id: new ObjectId(id) }, callback)
}

module.exports = { findAll, findLast, findOne, findSKU, insertOne, updateOne, patchOne, deleteOne }