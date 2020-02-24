'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SegmentSchema = Schema({
    AudienceID: String,
    audienceName: String,
    audienceDescription: String,
    audienceCreationDate: String,
    audienceType: Number,
    clientName: String,
    monthlyUniques: String,
    classificationMetadata: String,
    typePlatform: String,
    namePlatform: String,
    urlIframe: String,
    status: String,

})

module.exports = mongoose.model('Segment', SegmentSchema)