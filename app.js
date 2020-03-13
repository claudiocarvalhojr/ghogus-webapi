if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

global.db = require('./db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'OK' }));

// GET /clientes
router.get('/clientes', (req, res) => global.db.findCustomers('customers', (err, docs) => {
    if (err) { res.status(500).json(err) }
    else { res.json(docs) }
}));

// GET /clientes/{id}
router.get('/clientes/:id', (req, res) => global.db.findCustomer('customers', req.params.id, (err, docs) => {
    if (err) { res.status(500).json(err) }
    else { res.json(docs) }
}));

// POST /clientes
router.post('/clientes', (req, res) => {
    const customer = req.body
    global.db.insertCustomer('customers', customer, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Cliente cadastrado com sucesso!' }) }
    })
})

// PUT /clientes/{id}
router.put('/clientes/:id', (req, res) => {
    const id = req.params.id
    const customer = req.body
    global.db.updateCustomer('customers', id, customer, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Cliente atualizado com sucesso!' }) }
    })
})

// PATCH /clientes/{id}
router.patch('/clientes/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    global.db.patchCustomer('customers', id, updates, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Cliente atualizado com sucesso!' }) }
    })
})

// DELETE /clientes/{id}
router.delete('/clientes/:id', (req, res) => {
    const id = req.params.id
    global.db.deleteCustomer('customers', id, (err, result) => {
        if (err) { res.status(500).json(err) }
        else { res.json({ message: 'Cliente excluído com sucesso!' }) }
    })
})

app.use('/', router);
app.listen(port, function () {
    console.log('API => Status: OK... DB: OK... Port: %s... Environment: %s...', port, process.env.NODE_ENV);
});
