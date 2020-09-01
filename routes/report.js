'use strict'

var express = require('express');
var ReportController = require('../controllers/report');
var api = express.Router();
var md_awth = require('../middlewares/authenticated');

api.get('/report/:page?', ReportController.getReport);   //lista de report totales paginados
api.get('/report/audienceId/:id', ReportController.getReportByAudId);       //lista de report por id de audiencia
api.get('/report/date/:date?', ReportController.getReportByDate);       //lista de report por fecha de segmento
api.get('/report/dates/:date/:date2', ReportController.getReportInDate);       //lista de report por fecha de segmento
api.get('/report/clientId/:id', ReportController.getReportByCliId);       //lista de report por id de cliente
api.get('/report/audName/:audName', ReportController.getReportByAudName);
api.get('/report/catName/:catName', ReportController.getReportByCatName);

api.get('/report/platform/:platform', ReportController.getReportByPlatform); //lista de report por plataforma de segmento 
api.put('/report/urlIframe/:id', md_awth.ensureAuth, ReportController.updateIframeForReport); //lista de report por plataforma de segmento 
api.put('/report/updateReport/:id', md_awth.ensureAuth, ReportController.updateReportById);



module.exports = api;
