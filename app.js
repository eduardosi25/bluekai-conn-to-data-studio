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

var segments_routes= require ('./routes/segment')
var user_routes= require ('./routes/user')

// prefijo de rutas 
app.use('/v1/api', user_routes, segments_routes)



//exportar 
module.exports = app;
