'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const JWT_SECRET = process.env.BK_JWT_SECRET;


exports.ensureAuth = function(req, res, next){
    if (!req.headers.authorization){
        return res.status(403).send({message: 'la peticion no tiene cabacera de autorizacion'});
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    var token = req.headers.authorization.split(" ")[1];
    console.log("token --->",token)
    try{
        var payload = jwt.decode(token, `${JWT_SECRET}`);
        if (payload.exp <= moment().unix()){
            return res.status(401).send({message: 'el token ha expirado'})
        }
    }catch(ex){
        return res.status(404).send({message: 'el token no es válido'});
    }

    req.user = payload;
    next();

}