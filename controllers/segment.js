'use strict'
var Segment = require('../models/segment');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var mongoosPaginate = require('mongoose-pagination');

function updateIframeForSegment(req, res){
    var urlIframe = req.body.urlIframe;
    var id = req.params.id;

    Segment.findByIdAndUpdate({ _id:id }, { urlIframe:req.body.urlIframe, status: 1 }, {new: true},  (err, segment)=>{
    
         if (!segment) return res.status(404).send({ message:'el id no existe' });
         
         if (segment.length === 0) return res.status(404).send({ message:'no hay coincidencias con el id ' });
 
         return res.status(200).send(segment);
     });
}

function updateSegmentById(req, res){
    var image = req.body.image;
    var category = req.body.category;
    var displayName = req.body.displayName;
    var id = req.params.id;
    console.log(id)
    console.log(image)
    console.log(category)
    console.log(displayName)

    Segment.findByIdAndUpdate({ _id: id }, { image: image, category: category, displayName: displayName }, {new: true},  (err, segment)=>{
    
         if (!segment) return res.status(404).send({ message:'el id no existe' });
         
         if (segment.length === 0) return res.status(404).send({ message:'no hay coincidencias con el id ' });
 
         return res.status(200).send(segment);
     });
}




function getSegmentByPlatform(req,res){
    var platform = req.params.platform;
    
    Segment.find({"typePlatform": platform}, (err, segment)=>{
       // console.log(segment)
        if(err) return res.status(500).send({ message: 'error en la petición' });

        if (!segment) return res.status(404).send({ message:'la plataforma no existe' });
        
        if (segment.length === 0) return res.status(404).send({ message:'no hay coincidencias con la plataforma ' });

        return res.status(200).send(segment);
    });
}

function getSegmentById(req,res){
    var AudienceID = req.params.id;
 
    Segment.findOne({_id: AudienceID}, (err, segment)=>{
        if(err) return res.status(500).send({ message: 'error en la petición' });
      
        if (!segment) return res.status(404).send({ message:'el usuario no existe' });
  
        return res.status(200).send(segment);
    });
}
//Conseguir datos de un usuario
function getSegmentByStatus(req,res){
  
    var status = req.params.status
    Segment.find({status:status}, (err, segment)=>{
       console.log(segment)
        if(err) return res.status(500).send({ message: 'error en la petición' });

        if (!segment) return res.status(404).send({ message:'el status no existe' });
       
        if (segment.length === 0) return res.status(404).send({ message:'no hay coincidencias con el status' });

        return res.status(200).send(segment);
    });
}

//devolver listado de usuarios paginados // Devolver listado de usuario paginados
function getSegments(req, res) {
   // var identitySegmentId = req.segment.sub;
   //console.log(req)
    var page = 1;
    var itemsPerPage = 5;
   
    if (req.params.page) {
      page = req.params.page;
    }
   
    Segment.find()
      .sort("_id")
      .paginate(page, itemsPerPage, (err, segments, total) => {
        if (err) return res.status(500).send({ message: "Error en la petición" });
        if (!segments) return res.status(404).send({ message: "No hay usuarios disponibles" });
        //devolver los datos del usuario
    
        return res.status(200).send({
            //devolver los datos del usuario
          segments,
          total,
          pages: Math.ceil(total / itemsPerPage)
        });
      });
  }

module.exports = {
    getSegments,
    getSegmentById,
    updateSegmentById,
    getSegmentByStatus,
    getSegmentByPlatform,
    updateIframeForSegment,

}