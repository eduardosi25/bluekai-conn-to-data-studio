'use strict'

var express = require('express');
var SegmentController = require('../controllers/segment');
var api = express.Router();
var md_awth = require('../middlewares/authenticated');

api.get('/segments/:page?', SegmentController.getSegments);   //lista de segmentos totales paginados
api.get('/segment/status/:status', SegmentController.getSegmentByStatus);    //lista de segmentos por status de segmento 
api.get('/segment/id/:id', SegmentController.getSegmentById);       //lista de segmento por id de segmento
api.get('/segment/platform/:platform', SegmentController.getSegmentByPlatform); //lista de segmentos por plataforma de segmento 
api.put('/segment/urlIframe/:id', SegmentController.updateIframeForSegment); //lista de segmentos por plataforma de segmento 



module.exports = api;
