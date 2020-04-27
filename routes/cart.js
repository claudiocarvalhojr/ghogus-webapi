var express = require('express');
var router = express.Router();

global.db = require('../db');

function log(message) {
    let data = new Date()
    console.log('****************************************')
    console.log(data.toLocaleString() + ' - ' + message)
    // console.log('****************************************')
}

router.get('/', (req, res) => {
	log('cart/home()...')
	res.json({ message: 'OK' })
})

// GET /cart
router.get('/cart', (req, res) => {
	global.db.findAll('cart', (err, docs) => {
		if (err) { res.status(500).json(err) }
		else { res.json(docs) }
	})
})

// GET /cart/{id}
//router.get('/cart/:id', (req, res) => {
//	global.db.findOne('cart', req.params.id, (err, docs) => {
//    if (err) { res.status(500).json(err) }
//    else { res.json(docs) }
//	})
//})

// GET /cart/{search}
router.get('/cart/:search', (req, res) => {
	global.db.find('cart', req.params.search, (err, docs) => {	
		if (err) { res.status(500).json(err) }
		else { res.json(docs) }
	})
})

// GET /cart
router.get('/cart/last', (req, res) => {
	global.db.findLast('cart', (err, doc) => {
		if (err) { res.status(500).json(err) }
		else { res.json(doc) }
	})
})

// POST /cart
router.post('/cart', (req, res) => {
    global.db.insertOne('cart', req.body, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Cart cadastrado com sucesso!' }) }
    })
})

// PUT /cart/{id}
router.put('/cart/:id', (req, res) => {
    global.db.updateOne('cart', req.params.id, req.body, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Cart atualizado com sucesso!' }) }
    })
})

// PATCH /cart/{id}
router.patch('/cart/:id', (req, res) => {
    global.db.patchOne('cart', req.params.id, req.body, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Cart atualizado com sucesso!' }) }
    })
})

// DELETE /cart/{id}
router.delete('/cart/:id', (req, res) => {
    global.db.deleteOne('cart', req.params.id, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Cart excluído com sucesso!' }) }
    })
})

module.exports = router