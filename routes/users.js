var express = require('express');
var router = express.Router();

global.db = require('../db');

router.get('/', (req, res) => res.json({ message: 'OK' }));

// GET /users
router.get('/users', (req, res) => global.db.findAll('users', (err, docs) => {
    if (err) { res.status(500).json(err) }
    else { res.json(docs) }
}));

// GET /user/{id}
router.get('/user', (req, res) => {	
//	let id = req.query.id | req.body.id | req.params.id
//	console.log('\nID: ' + id + '\n')	
//	let id = req.query.id // Este OK
	global.db.findOne('users', req.query.id, (err, docs) => {
		if (err) { res.status(500).json(err) }
		else { res.json(docs) }
	})
});

// POST /user
router.post('/user', (req, res) => {
    global.db.insertOne('users', req.body, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Usuário cadastrado com sucesso!' }) }
    })
})

// PUT /user/{id}
router.put('/user/:id', (req, res) => {
    global.db.updateOne('users', req.params.id, req.body, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Usuário atualizado com sucesso!' }) }
    })
})

// PATCH /user/{id}
router.patch('/user/:id', (req, res) => {
    global.db.patchOne('users', req.params.id, req.body, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Usuário atualizado com sucesso!' }) }
    })
})

// DELETE /user/{id}
router.delete('/user/:id', (req, res) => {
    global.db.deleteOne('users', req.params.id, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Usuário excluído com sucesso!' }) }
    })
})

module.exports = router;