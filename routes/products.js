var express = require('express')
var router = express.Router()

global.db = require('../db')

function log(message) {
    let data = new Date()
    console.log('****************************************')
    console.log(data.toLocaleString() + ' - ' + message)
    // console.log('****************************************')
}

router.get('/', (req, res) => {
	log('products/home()...')
	res.json({ message: 'OK' })
})

// GET /products
router.get('/products', (req, res) => {
	global.db.findAll('products', (err, docs) => {
		if (err) { res.status(500).json(err) }
		else { res.json(docs) }
	})
})

// GET /products/{id}
router.get('/products/:id', (req, res) => {
	global.db.findOne('products', req.params.id, (err, doc) => {
		if (err) { res.status(500).json(err) }
		else { res.json(doc) }
	})
})

// GET /products/sku/{sku}
router.get('/product/sku/:sku', (req, res) => {
	global.db.findSKU('products', req.params.sku, (err, doc) => {
		if (err) { res.status(500).json(err) }
		else { res.json(doc) }
	})
})

// GET /product/search/{search}
router.get('/product/search/:search', (req, res) => {
	global.db.find('products', req.params.search, (err, docs) => {
		if (err) { res.status(500).json(err) }
		else { res.json(docs) }
	})
})

// POST /products
router.post('/product', (req, res) => {
    global.db.insertOne('products', req.body, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Produto cadastrado com sucesso!' }) }
    })
})

// PUT /products/{id}
router.put('/products/:id', (req, res) => {
    global.db.updateOne('products', req.params.id, req.body, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Produto atualizado com sucesso!' }) }
    })
})

// PATCH /products/{id}
router.patch('/products/:id', (req, res) => {
    global.db.patchOne('products', req.params.id, req.body, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Produto atualizado com sucesso!' }) }
    })
})

// DELETE /products/{id}
router.delete('/products/:id', (req, res) => {
    global.db.deleteOne('products', req.params.id, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Produto excluído com sucesso!' }) }
    })
})

module.exports = router