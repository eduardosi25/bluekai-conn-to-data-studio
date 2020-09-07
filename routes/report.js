'use strict'

var express = require('express');
var ReportController = require('../controllers/report');
var api = express.Router();
var md_awth = require('../middlewares/authenticated');


api.get('/report/audienceId/:id', ReportController.getReportByAudId);       //lista de report por id de audiencia
api.get('/report/date/:clientId?/:date?', ReportController.getReportByDate);       //lista de report por fecha de segmento
api.get('/report/dates/:clientId?/:date/:date2', ReportController.getReportInDate);       //lista de report por fecha de segmento
api.get('/report/clientId/:id', ReportController.getReportByCliId);       //lista de report por id de cliente
api.get('/report/audName/:clientId?/:audName', ReportController.getReportByAudName);
api.get('/report/catName/:clientId?/:catName?', ReportController.getReportByCatName);
api.get('/report/dataType/:clientId?/:dataType?', ReportController.getReportByDataType);
api.get('/report/:clientId?/:page?', md_awth.ensureAuth, ReportController.getReport);   //lista de report totales paginados

api.put('/report/urlIframe/:id', md_awth.ensureAuth, ReportController.updateIframeForReport); //lista de report por plataforma de segmento 
api.put('/report/updateReport/:id', md_awth.ensureAuth, ReportController.updateReportById);



module.exports = api;
