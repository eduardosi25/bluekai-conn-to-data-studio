'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ReportSchema = Schema({
    _id: String,
    audienceId: String,
    clientId: String,
    audienceName: String,
    base_segment_size_unfiltered: Number,
    odc_universe_reach: Number,
    date: Date,
    category_id: String,
    second_segment_reach: Number,
    category_index: Number,
    base_segment_size_filtered: Number,
    internal_leftCI: Number,
    internal_rightCI: Number,
    internal_CL: Number,
    category_description: String,
    category_name: String,
    data_type: String,
    category_path: String,
    vertical_name: String,

})

module.exports = mongoose.model('Report', ReportSchema)