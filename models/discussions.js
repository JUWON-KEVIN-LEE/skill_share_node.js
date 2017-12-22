var mongoose = require('mongoose');

var discussionSchema = new mongoose.Schema({
    content : String,
    time : String,
    likeCount : String,
    userId : String,
    name : String,
    imageUrl : String,
    resId : String,
    replies : [{
        name : String,
        imageUrl : String,
        content : String,
        time : String
    }]
}, {'versionKey' : false});

mongoose.connect('mongodb://localhost:27017/skill-share-db');

module.exports = mongoose.model('discussion', discussionSchema);