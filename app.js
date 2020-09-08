'use strict'

var express = require('express');
var bodyParser = require ('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());
//cargar rutas

// middleware
if (process.env.NODE_ENV === 'development') {
const morgan = require('morgan');
app.use(morgan('dev'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});
}

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors

//cargar rutas

var report_routes= require ('./routes/report')
var user_routes= require ('./routes/user')

// prefijo de rutas 
app.use('/v1/api', report_routes, user_routes)

//exportar 
module.exports = app;
