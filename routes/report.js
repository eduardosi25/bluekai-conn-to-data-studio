'use strict'

var express = require('express');
var ReportController = require('../controllers/report');
var api = express.Router();
var md_awth = require('../middlewares/authenticated');

api.get('/report/:page?', ReportController.getReport);   //lista de segmentos totales paginados
api.get('/report/status/:status', ReportController.getReportByStatus);    //lista de segmentos por status de segmento 
api.get('/report/id/:id', ReportController.getReportById);       //lista de segmento por id de segmento
api.get('/report/platform/:platform', ReportController.getReportByPlatform); //lista de segmentos por plataforma de segmento 
api.put('/report/urlIframe/:id', md_awth.ensureAuth, ReportController.updateIframeForReport); //lista de segmentos por plataforma de segmento 
api.put('/report/updateReport/:id', md_awth.ensureAuth, ReportController.updateReportById);



module.exports = api;
