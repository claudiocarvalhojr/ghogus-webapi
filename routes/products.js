var express = require('express');
var router = express.Router();

global.db = require('../db');

router.get('/', (req, res) => res.json({ message: 'OK' }));

// GET /products
router.get('/products', (req, res) => global.db.findAll('products', (err, docs) => {
    if (err) { res.status(500).json(err) }
    else { res.json(docs) }
}));

// GET /products/{id}
router.get('/products/:id', (req, res) => global.db.findOne('products', req.params.id, (err, docs) => {
    if (err) { res.status(500).json(err) }
    else { res.json(docs) }
}));

// GET /product/{id}
router.get('/product/:id', (req, res) => global.db.findSKU('products', req.params.id, (err, docs) => {
    if (err) { res.status(500).json(err) }
    else { res.json(docs) }
}));

// POST /products
router.post('/products', (req, res) => {
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

module.exports = router;