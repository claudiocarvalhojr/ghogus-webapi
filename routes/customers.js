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
	log('customers/home()...')
	res.json({ message: 'OK' })
})

// GET /customers
router.get('/customers', (req, res) => global.db.findAll('customers', (err, docs) => {
    if (err) { res.status(500).json(err) }
    else { res.json(docs) }
}));

// GET /customers/{id}
router.get('/customers/:id', (req, res) => global.db.findOne('customers', req.params.id, (err, docs) => {
    if (err) { res.status(500).json(err) }
    else { res.json(docs) }
}));

// POST /customers
router.post('/customers', (req, res) => {
    const customer = req.body
    global.db.insertOne('customers', customer, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Cliente cadastrado com sucesso!' }) }
    })
})

// PUT /customers/{id}
router.put('/customers/:id', (req, res) => {
    const id = req.params.id
    const customer = req.body
    global.db.updateOne('customers', id, customer, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Cliente atualizado com sucesso!' }) }
    })
})

// PATCH /customers/{id}
router.patch('/customers/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    global.db.patchOne('customers', id, updates, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Cliente atualizado com sucesso!' }) }
    })
})

// DELETE /customers/{id}
router.delete('/customers/:id', (req, res) => {
    const id = req.params.id
    global.db.deleteOne('customers', id, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Cliente excluído com sucesso!' }) }
    })
})

module.exports = router