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
const NODE_ENV = process.env.NODE_ENV;
//conexion base de datos 
mongoose.promise = global.promise;
// mongoose.connect(`mongodb+srv://appaudiencekit:aEqslb71Vh0DUVkD@audiencekit1-76o4f.mongodb.net/audienceKit?retryWrites=true&w=majority`,
//                   {useNewUrlParser: true, useUnifiedTopology: true })

//  mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@audiencekit1-76o4f.mongodb.net/${DB_TABLE}?retryWrites=true&w=majority`,
//                    { useUnifiedTopology: true,  useNewUrlParser: true, useFindAndModify: false})
if(NODE_ENV === "production")
{
 mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@mongodb.net/${DB_TABLE}?retryWrites=true&w=majority`,                    
      { useUnifiedTopology: true,  useNewUrlParser: true, useFindAndModify: false})
.then (()=>{
    console.log("la conexion esta lista production")
    //Crear servidor 
    app.listen(PORT, ()=>{
      console.log(`servidor corriendo en ${process.env.NODE_ENV} mode on port ${PORT}`)
    });
}).catch(err => console.log(err));
}
else if(NODE_ENV === "development")
{
mongoose.connect(DB_DOMAIN,
                    { useUnifiedTopology: true,  useNewUrlParser: true, useFindAndModify: false})
.then (()=>{
    console.log("la conexion esta lista desarrollo")
    //Crear servidor 
    app.listen(PORT, ()=>{
      console.log(`servidor corriendo en ${process.env.NODE_ENV} mode on port ${PORT}`)
    });
}).catch(err => console.log(err));

}
console.log(NODE_ENV); //"production"

  
 
