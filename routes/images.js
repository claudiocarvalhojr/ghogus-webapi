var express = require('express');
var router = express.Router();

global.db = require('../db');

router.get('/', (req, res) => res.json({ message: 'OK' }));

// GET /images
router.get('/images', (req, res) => global.db.findAll('images', (err, docs) => {
    if (err) { res.status(500).json(err) }
    else { res.json(docs) }
}));

// GET /images
router.get('/images/last', (req, res) => global.db.findLast('images', {'_id': -1}, (err, doc) => {
    if (err) { res.status(500).json(err) }
    else { res.json(doc) }
}));

// GET /images/{id}
router.get('/images/:id', (req, res) => global.db.findOne('images', req.query.id, (err, docs) => {
    if (err) { res.status(500).json(err) }
    else { res.json(docs) }
}));

// POST /images
router.post('/images', (req, res) => {
    global.db.insertOne('images', req.body, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Imagem cadastrada com sucesso!' }) }
    })
})

// PUT /images/{id}
router.put('/images/:id', (req, res) => {
    global.db.updateOne('images', req.params.id, req.body, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Image atualizada com sucesso!' }) }
    })
})

// PATCH /images/{id}
router.patch('/images/:id', (req, res) => {
    global.db.patchOne('images', req.params.id, req.body, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Image atualizada com sucesso!' }) }
    })
})

// DELETE /images/{id}
router.delete('/images/:id', (req, res) => {
    global.db.deleteOne('images', req.params.id, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Image excluída com sucesso!' }) }
    })
})

module.exports = router;