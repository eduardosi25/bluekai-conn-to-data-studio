'use strict'
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var mongoosPaginate = require('mongoose-pagination');

function home(req, res){
    res.status(200).send({
        message: "Hola mundo"
    });
}

function pruebas (req, res){
   // console.log(req.body);
    res.status(200).send({
        message: "pruebas en el servidor de nodejs"
    });
}

function saveUser (req, res){
    
    var params = req.body;
    var user = new User();
    if (params.name && params.lastname && 
        params.email && params.password){

            user.name = params.name;
            user.lastname = params.lastname;
            user.clientId = '2';
            user.status = params.status;
            user.email = params.email;
            user.password = params.password;
            user.role = 'ROLE_USER';
            user.clientId = params.clientId;
            user.status = params.status;
            user.token = 'gtrfcedilkmujnhybgtvrfikujhygtrfloikmrfiokujhygtrf'

            //controlar usuarios duplicados
            User.find({email:user.email.toLowerCase()})
            .exec((err, users)=>{
                if (err) return res.status(500).send({message: 'error en la peticion de usuarios'})
                if ( users && users.length >= 1 ){
                    return res.status(200).send({message:'el usuario que intentas registrar ya existe'})
                }else{
                    bcrypt.hash(params.password, null, null,(err, hash)=>{
                        user.password = hash;
                        user.save((err,userStored)=>{
                        if(err) return res.status(500).send({message:'error al guardar un usuario'});
                        if(userStored){
                            res.status(200).send({user:userStored});
                        }else{
                            res.status(404).send({message:'no se ha registrado el usuario'});
                        }
                        })
                    });
                }
            });

            //cifra los datos y guarda la pass
    }else{
            res.status(200).send({
                message: 'Envia todos los campos necesarios'
            });
        }
 }

function loginUser(req,res){
    var params = req.body;
    var email = params.email;
    var password = params.password;
    User.findOne({email:email}, (err, user)=>{
        if (err) return res.status(500).send({message:'error en la peticion'});
        if (user){
            bcrypt.compare(password, user.password, (err, check)=>{
                if (check){
                    //devolver los datos 
                    if(params.gettoken){
                        //devolver token 
                        //generar token y devolver 
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }else{
                        //devolver los datos del usuario
                        user.password = undefined;
                        return res.status(200).send({user})
                    }
                }else{
                    return res.status(404).send({message:'El usuario no se ha podido identificar'});
                }
            });
        }else {
            return res.status(404).send({message:'El usuario no se ha podido identificar!'});
        }
    })
}

//Conseguir datos de un usuario
function getUser(req,res){
    var userId = req.params.id;
    //console.log(userId)
    
    User.findById(userId, (err, user)=>{
        if(err) return res.status(500).send({message:'error en la petición'});
      
        if (!user) return res.status(404).send({message:'el usuario no existe'});
  
        return res.status(200).send({user});
    });
}

//devolver listado de usuarios paginados // Devolver listado de usuario paginados
function getUsers(req, res) {
    var identityUserId = req.user.sub;
    var page = 1;
    var itemsPerPage = 5;
   
    if (req.params.page) {
      page = req.params.page;
    }
   
    User.find()
      .sort("_id")
      .paginate(page, itemsPerPage, (err, users, total) => {
        if (err) return res.status(500).send({ message: "Error en la petición" });
        if (!users) return res.status(404).send({ message: "No hay usuarios disponibles" });
        //devolver los datos del usuario
    
        return res.status(200).send({
            //devolver los datos del usuario
          users,
          total,
          pages: Math.ceil(total / itemsPerPage)
        });
      });
  }

//edicion de datos de usuarios
function updateUser(req, res){
    var userId = req.params.id;
    console.log(req.params.id)
    var update = req.body;
    console.log(update)
//borrar propiedad password

    delete update.password;

    if(userId != req.user.sub){
        return res.status(500).send({message:'no tienes permiso para modificar los datos de usuario'})
    }
    User.findByIdAndUpdate(userId, update, {new:true}, (err,userUpdated)=>{
        //console.log(userUpdated);
        if (err) return res.status(500).send({ message:'Error en la petición' });
        if (!userUpdated) return res.status(404).send({ message:'no se ha podido actualizar el usuario'})
        return res.status(200).send({ user:userUpdated });
    });
}

module.exports = {
    home,
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser
}