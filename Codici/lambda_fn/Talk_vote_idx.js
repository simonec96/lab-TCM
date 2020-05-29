const mongoose = require('mongoose');

const talk_schema = new mongoose.Schema({
    _id: String,
    title: String,
    url:String,
    vote_user: [{ vote: String, date: String, time: String, user_mail: String }]
}, { collection: 'tedz_data' });



module.exports = mongoose.model('talk', talk_schema);