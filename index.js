'use strict'
var mongoose = require("mongoose");
var app = require('./app');

const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const PORT = process.env.PORT || 3000;
const DB_DOMAIN = process.env.DB_DOMAIN;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_TABLE = process.env.DB_TABLE;
//conexion base de datos 
mongoose.promise = global.promise;
mongoose.connect( `mongodb+srv://${DB_USER}:${DB_PASSWORD}@audiencekit1-76o4f.mongodb.net/${DB_TABLE}?retryWrites=true&w=majority`,
                  { useUnifiedTopology: true,  useNewUrlParser: true, useFindAndModify: true})
.then (()=>{
    console.log("la conexion esta lista")
    //Crear servidor 
    app.listen(PORT, ()=>{
      console.log(`servidor corriendo en ${process.env.NODE_ENV} mode on port ${PORT}`)
    });
}).catch(err => console.log(err));