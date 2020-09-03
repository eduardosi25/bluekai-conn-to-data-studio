'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    name:String,
    lastname:String,
    email:String,
    password:String,
    role: String,
    clientId: String,
    status: String,
    // token: String,

})

module.exports = mongoose.model('User', UserSchema)