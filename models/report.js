'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ReportSchema = Schema({
    audienceId: Number,
    clientId: String,
    audienceName: String,
    base_segment_size_unfiltered: Number,
    odc_universe_reach: Number,
    date: String,
    discovery: Array
})

module.exports = mongoose.model('Report', ReportSchema)