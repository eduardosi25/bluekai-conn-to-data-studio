'use strict'
var mongoose = require("mongoose");
var app = require('./app');

const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const BK_PORT = process.env.BK_PORT || 3000;
const BK_DB_DOMAIN = process.env.BK_DB_DOMAIN;
const BK_DB_DATABASE = process.env.BK_DB_DATABASE;
const BK_DB_USER = process.env.BK_DB_USER;
const BK_DB_PASSWORD = process.env.BK_DB_PASSWORD;
const BK_DB_TABLE = process.env.BK_DB_TABLE;
const BK_NODE_ENV = process.env.BK_NODE_ENV;
//conexion base de datos 
mongoose.promise = global.promise;
// mongoose.connect(`mongodb+srv://appaudiencekit:aEqslb71Vh0DUVkD@audiencekit1-76o4f.mongodb.net/audienceKit?retryWrites=true&w=majority`,
//                   {useNewUrlParser: true, useUnifiedTopology: true })

//  mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@audiencekit1-76o4f.mongodb.net/${DB_TABLE}?retryWrites=true&w=majority`,
//                    { useUnifiedTopology: true,  useNewUrlParser: true, useFindAndModify: false})
if(BK_NODE_ENV === "production")
{
 mongoose.connect(`mongodb+srv://${BK_DB_USER}:${BK_DB_PASSWORD}@audiencekit1-76o4f.mongodb.net/bluekaiConnector?retryWrites=true&w=majority`,                    
      { useUnifiedTopology: true,  useNewUrlParser: true, useFindAndModify: false})
.then (()=>{
    console.log("la conexion esta lista production")
    //Crear servidor 
    app.listen(BK_PORT, ()=>{
      console.log(`servidor corriendo en ${process.env.BK_NODE_ENV} mode on port ${BK_PORT}`)
    });
}).catch(err => console.log(err));
}
else if(BK_NODE_ENV === "development")
{
mongoose.connect(BK_DB_DOMAIN,
                    { useUnifiedTopology: true,  useNewUrlParser: true, useFindAndModify: false})
.then (()=>{
    console.log("la conexion esta lista desarrollo")
    //Crear servidor 
    app.listen(BK_PORT, ()=>{
      console.log(`servidor corriendo en ${process.env.BK_NODE_ENV} mode on port ${BK_PORT}`)
    });
}).catch(err => console.log(err));

}
console.log(BK_NODE_ENV); //"production"

  
 
