var mongoose = require('mongoose');

var comment = mongoose.Schema({
    _id : false,
    field : {
        groupName : String,
        value : [{
            _id : false,
            field : {
                userId : String,
                userName: String,
                userNickname: String,
                imageUrl: String,
                comment: String,
                time : String
            }
        }]
    }
})

var commentSchema = mongoose.Schema({
    _id : false,
    field : {
        comments : [{
            comment
        }]
    }
});

mongoose.connect('mongodb://localhost:27017/skill-share-db');

module.exports = mongoose.model('comment', commentSchema);