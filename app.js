'use strict'

var express = require('express');
var bodyParser = require ('body-parser')
var app = express();

//cargar rutas

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors

//cargar rutas
var user_routes= require ('./routes/user')
var user_routes= require ('./routes/segment')


// prefijo de rutas 
app.use('/v1/api', user_routes)


//exportar 
module.exports = app;
