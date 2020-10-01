var express = require('express');
var logger = require('morgan');
const cleanroutes = require('express-clean-routes');
const helmet = require('helmet');
const routes = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use('/', cleanroutes(routes));

app.use( (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err)
})

module.exports = app;
