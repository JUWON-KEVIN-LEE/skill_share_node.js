var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
    groupName : String,
    groupThumbnail : String,
    memberCount : String,
    memberNicknames : [String],
    comments : [{
        userId : String,
        userName: String,
        userNickname: String,
        imageUrl: String,
        comment: String,
        time : String
    },{_id : false}]
}, {'versionKey' : false});

mongoose.connect('mongodb://localhost:27017/skill-share-db');

module.exports = mongoose.model('group', groupSchema);