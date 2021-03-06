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

function find(collection, search, callback) {
	log(collection + '/find(search)...')
	let obj = JSON.parse(search)
	let values = obj.values
	let limit = obj.limit
	let fields = obj.fields
	let ordination = obj.ordination	
//	console.log('1) values: ' + JSON.stringify(values))
//	console.log('2) fields: ' + fields)
//	console.log('3) ordination: ' + ordination)
//	console.log('4) limit: ' + limit)	
    global.conn.collection(collection).find(values).sort({fields:ordination}).limit(limit).toArray(callback)
}

function findAll(collection, callback) {
	log(collection + '/findAll...')
    global.conn.collection(collection).find().toArray(callback) 
}

function findOne(collection, id, callback) {
	log(collection + '/findOne(' + id + ')...')
    global.conn.collection(collection).findOne(new ObjectId(id), callback)
}

function findSKU(collection, value, callback) {
	log(collection + '/findSKU(' + value + ')...')
//	console.log('NAME: ' + field)
//	console.log('NAME: ' + typeof field)
//	console.log('VALUE: ' + value)
//	let obj = {values:{field : value}}
//	let obj = {sku : value}
//	console.log('OBJ: ' + JSON.stringify(obj))
//	console.log('SKU: ' + JSON.stringify(obj.sku))
    global.conn.collection(collection).findOne({sku: value}, callback)
}

function findLast(collection, search, callback) {
	log(collection + '/findLast(search)...')
	let obj = JSON.parse(search)
	let values = obj.values
//	console.log('1) values: ' + JSON.stringify(values))
    global.conn.collection(collection).find(values).sort({'_id':-1}).limit(1).toArray(callback)
}

//function findLast(collection, callback) { 
//	log(collection + '/findLast()...')
//   global.conn.collection(collection).find().sort({'_id': -1}).limit(1).toArray(callback)
//}

function insertOne(collection, object, callback) {
	log(collection + '/insertOne...')
    global.conn.collection(collection).insertOne(object, callback);
}

function updateOne(collection, id, object, callback) {
	log(collection + '/updateOne(' + id + ')...')
//	console.log('id: ' + id)
//	console.log('object: ' + JSON.stringify(object))
    global.conn.collection(collection).updateOne({ _id: new ObjectId(id) }, object, callback)
}

function patchOne(collection, id, update, callback) {
	log(collection + '/patchOne(' + id + ')...')
    global.conn.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: update }, callback)
}

function patchMany(collection, id, updates, callback) {
	log(collection + '/patchMany(' + id + ')...')
    global.conn.collection(collection).updateMany({ _id: new ObjectId(id) }, { $set: updates }, callback)
}

function set(collection, id, update, callback) {
	log(collection + '/set(' + id + ')...')	
	let ids = id.split('_')	
//	console.log('ID1: ' + ids[0])
//	console.log('ID2: ' + ids[1])	
    global.conn.collection(collection).updateOne({ _id: new ObjectId(ids[0]), 'products._id': ids[1]}, { $set: update }, callback)
}

function push(collection, id, update, callback) {
	log(collection + '/push(' + id + ')...')	
    global.conn.collection(collection).updateOne({ _id: new ObjectId(id)}, { $set: update }, callback)
}

function pull(collection, id, update, callback) {
	log(collection + '/pull(' + id + ')...')	
    global.conn.collection(collection).updateOne({ _id: new ObjectId(id)}, {$pull: update }, callback)
}

function deleteOne(collection, id, callback) {
	log(collection + '/deleteOne(' + id + ')...')
    global.conn.collection(collection).deleteOne({ _id: new ObjectId(id) }, callback)
}

module.exports = { find, findAll, findLast, findOne, findSKU, insertOne, updateOne, patchOne, patchMany, set, push, pull, deleteOne }