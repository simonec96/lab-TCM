const mongoose = require('mongoose');

const talk_schema = new mongoose.Schema({
    _id: String,
    title: String,
    url:String,
    main_speaker:String,
    vote_user: [{vote:Number,mail_user:String}]
}, { collection: 'tedz_data' });


var Talk = mongoose.model('talk', talk_schema);

module.exports=Talk;
