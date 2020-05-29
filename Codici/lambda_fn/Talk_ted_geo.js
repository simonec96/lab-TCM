const mongoose = require('mongoose');

const talk_schema = new mongoose.Schema({
    title: String,
    url: String,
    geo_area:{
        continent: String,
        nation:  String,
        city: String
    }
    
}, { collection: 'tedz_data' });

module.exports = mongoose.model('talk', talk_schema);