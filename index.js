'use strict'
var mongoose = require("mongoose");
var app = require('./app');

const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const PORT = process.env.PORT || 3800;
const DB_DOMAIN = process.env.DB_DOMAIN;
const DB_DATABASE = process.env.DB_DATABASE;

//conexion base de datos 
mongoose.promise = global.promise;
mongoose.connect( `mongodb://${DB_DOMAIN}:27017/${DB_DATABASE}`,{ useUnifiedTopology: true,  useNewUrlParser: true, useFindAndModify: false})
.then (()=>{
    console.log("la conexion esta lista")
    //Crear servidor 
    app.listen(PORT, ()=>{
      console.log(`servidor corriendo en ${process.env.NODE_ENV} mode on port ${PORT}`)
    });
}).catch(err => console.log(err));