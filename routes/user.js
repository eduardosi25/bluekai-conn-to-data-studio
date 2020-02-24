'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var api = express.Router();
var md_awth = require('../middlewares/authenticated');

api.get('/home', UserController.home);
api.get('/pruebas', md_awth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/user/:id', md_awth.ensureAuth, UserController.getUser);
api.get('/users/:page?', md_awth.ensureAuth, UserController.getUsers);
api.put('/update-user/:id', md_awth.ensureAuth, UserController.updateUser);

module.exports = api;
