'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
const dotenv = require('dotenv');
dotenv.config({path:'../config/config.env'});
exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        lastname:user.lastname,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix

    };

    return jwt.encode(payload, process.env.JWT_SECRET)
};