if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

var port = process.env.PORT || 3001;
const cors = require('cors');

var app = express();

var router = express.Router();
var customers = require('./routes/customers');
var users = require('./routes/users');
var products = require('./routes/products');
var images = require('./routes/images');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);
app.use('/', customers);
app.use('/', users);
app.use('/', products);
app.use('/', images);

app.listen(port, function () {
    console.log('API => Status: OK... DB: OK... Port: %s... Environment: %s...', port, process.env.NODE_ENV);
});

module.exports = app