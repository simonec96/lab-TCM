const mongoose = require('mongoose');

const talk_schema = new mongoose.Schema({
    _id: String,
    next_idx: Array
}, { collection: 'tedz_data' });



module.exports = mongoose.model('talk', talk_schema);