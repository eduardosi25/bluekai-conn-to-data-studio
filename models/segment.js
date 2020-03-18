'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SegmentSchema = Schema({
    AudienceID: String,
    audienceName: String,
    displayName: String,
    audienceDescription: String,
    audienceCreationDate: String,
    audienceModifiedDate: String,
    audienceTypeId: Number,
    clientName: String,
    clientId: String,
    monthlyUniques: Number,
    reach: Number,
    image: String,
    category: String,
    keywords: String,
    typePlatform: String,
    namePlatform: String,
    urlIframe: String,
    status: String,
})

module.exports = mongoose.model('Segment', SegmentSchema)