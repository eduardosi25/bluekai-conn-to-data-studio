'use strict'
var Report = require('../models/report');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var mongoosPaginate = require('mongoose-pagination');

function updateIframeForReport(req, res){
    var urlIframe = req.body.urlIframe;
    var id = req.params.id;

    Report.findByIdAndUpdate({ _id:id }, { urlIframe:req.body.urlIframe, status: 1 }, {new: true},  (err, report)=>{
    
         if (!report) return res.status(404).send({ message:'el id no existe' });
         
         if (report.length === 0) return res.status(404).send({ message:'no hay coincidencias con el id ' });
 
         return res.status(200).send(report);
     });
}

function updateReportById(req, res){
    var image = req.body.image;
    var category = req.body.category;
    var displayName = req.body.displayName;
    var id = req.params.id;
    Report.findByIdAndUpdate({ _id: id }, { image: image, category: category, displayName: displayName }, {new: true},  (err, report)=>{
    
         if (!report) return res.status(404).send({ message:'el id no existe' });
         
         if (report.length === 0) return res.status(404).send({ message:'no hay coincidencias con el id ' });
 
         return res.status(200).send(report);
     });
}




function getReportByPlatform(req,res){
    var platform = req.params.platform;
    
    Report.find({"typePlatform": platform}, (err, report)=>{
       // console.log(report)
        if(err) return res.status(500).send({ message: 'error en la petición' });

        if (!report) return res.status(404).send({ message:'la plataforma no existe' });
        
        if (report.length === 0) return res.status(404).send({ message:'no hay coincidencias con la plataforma ' });

        return res.status(200).send(report);
    });
}

function getReportById(req,res){
    var AudienceID = req.params.id;
 
    Report.find({"audienceId": AudienceID}, (err, report)=>{
        if(err) return res.status(500).send({ message: 'error en la petición' });
      
        if (!report) return res.status(404).send({ message:'no se encontro el id de audiencia' });
  
        return res.status(200).send(report);
    });
}
function getReportInDate(req,res){
  var date = req.params.date;
  // var date2 = new Date(req.params.date2);
  console.log(date)
  // console.log(date2)
  Report.find({'date':{'$gte':new Date('2020-08-23'), '$lte':new Date('2020-08-27')}}), (err, report)=>{
      if(err) return res.status(500).send({ message: 'error en la petición' });
    
      if (!report) return res.status(404).send({ message:'el usuario no existe' });
      // console.log(JSON.stringify(report));
      return res.status(200).send(report);
  };
}

function getReportByDate(req,res){
  var date = new Date(req.params.date);
  console.log(date)

  Report.find({"date": date}, (err, report)=>{
      if(err) return res.status(500).send({ message: 'error en la petición' });
    
      if (!report) return res.status(404).send({ message:'el usuario no existe' });
      // console.log(JSON.stringify(report));
      return res.status(200).send(report);
  });
}
//Conseguir datos de un usuario
function getReportByStatus(req,res){
  
    var status = req.params.status
    Report.find({status:status}, (err, report)=>{
       console.log(report)
        if(err) return res.status(500).send({ message: 'error en la petición' });

        if (!report) return res.status(404).send({ message:'el status no existe' });
       
        if (report.length === 0) return res.status(404).send({ message:'no hay coincidencias con el status' });

        return res.status(200).send(report);
    });
}

//devolver listado de usuarios paginados // Devolver listado de usuario paginados
function getReport(req, res) {
   // var identityReportId = req.report.sub;
   //console.log(req)
    var page = 1;
    var itemsPerPage = 20;
   
    if (req.params.page) {
      page = req.params.page;
    }
   
    Report.find()
      .sort("_id")
      .paginate(page, itemsPerPage, (err, report, total) => {
        if (err) return res.status(500).send({ message: "Error en la petición" });
        if (!report) return res.status(404).send({ message: "No hay usuarios disponibles" });
        //devolver los datos del usuario
    
        return res.status(200).send({
            //devolver los datos del usuario
          report,
          total,
          pages: Math.ceil(total / itemsPerPage)
        });
      });
  }

module.exports = {
    getReport,
    getReportById,
    updateReportById,
    getReportByStatus,
    getReportByDate,
    getReportInDate,
    getReportByPlatform,
    updateIframeForReport,

}