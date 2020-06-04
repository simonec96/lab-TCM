const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const talk_schema = new Schema({
    _id: String,
    title: String,
    url: String,
    details:String,
    main_speaker: String,
    next_idx: ['talk_ref']
}, { collection: 'tedz_data' });


module.exports = mongoose.model('talk', talk_schema);
