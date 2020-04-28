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

function log(message) {
    let data = new Date()
    console.log('****************************************')
    console.log(data.toLocaleString() + ' - ' + message)
    // console.log('****************************************')
}

function findAll(collection, callback) {
	log(collection + '/findAll()...')
    global.conn.collection(collection).find().toArray(callback) 
}

function findOne(collection, id, callback) {
	log(collection + '/findOne(id)...')
    global.conn.collection(collection).findOne(new ObjectId(id), callback)
}

function find(collection, search, callback) {
	log(collection + '/find(search)...')
	let obj = JSON.parse(search)
	let values = obj.values
	let limit = obj.limit
	let fields = obj.fields
	let ordination = obj.ordination	
//	console.log('2) values: ' + values)
//	console.log('3) fields: ' + fields)
//	console.log('4) ordination: ' + ordination)
//	console.log('5) limit: ' + limit)	
    global.conn.collection(collection).find(values).sort({fields:ordination}).limit(limit).toArray(callback)
}

function findLast(collection, callback) {
	log(collection + '/findLast()...')
    global.conn.collection(collection).find().sort({'_id': -1}).limit(1).toArray(callback)
}

function insertOne(collection, object, callback) {
	log(collection + '/insertOne()...')
    global.conn.collection(collection).insertOne(object, callback);
}

function updateOne(collection, id, object, callback) {
	log(collection + '/updateOne()...')
	console.log('id: ' + id)
	console.log('object: ' + JSON.stringify(object))
    global.conn.collection(collection).updateOne({ _id: new ObjectId(id) }, object, callback)
}

function patchOne(collection, id, updates, callback) {
	log(collection + '/patchOne()...')
    global.conn.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: updates }, callback)
}

function patch(collection, id, updates, callback) {
	log(collection + '/patch()...')	
	let ids = id.split('_')	
	console.log('ids1: ' + ids[0] + ' | ids2: ' + ids[1])	
    global.conn.collection(collection).updateOne({ _id: new ObjectId(ids[0]), 'products._id': ids[1]}, { $set: updates }, callback)
}

function deleteOne(collection, id, callback) {
	log(collection + '/deleteOne()...')
    global.conn.collection(collection).deleteOne({ _id: new ObjectId(id) }, callback)
}

module.exports = { findAll, findLast, findOne, find, insertOne, updateOne, patch, patchOne, deleteOne }