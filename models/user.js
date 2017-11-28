var mongoose = require('mongoose');

// Schema <<< document 구조를 보여준다
var Schema = mongoose.Schema;

// Schema type : String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
var userSchema = mongoose.Schema({
    userId : Schema.Types.ObjectId,
    email : String,
    password : String,
    followingSkills : [String],
    name : String,
    nickname : String,
    pictureUrl : String,
    following : [{ 
        userId : Schema.Types.ObjectId, 
        name : String, 
        pictureUrl : String 
    }],
    followers : [{
        userId : Schema.Types.ObjectId, 
        name : String, 
        picture_url : String 
    }],
    subsribeClass : [{ 
        classId : Schema.Types.ObjectId, 
        title : String, 
        tutorName : String, 
        totalDuration : String,
        feedback : String,
        views : Number, // String or Number
        classThumbnail : String
    }],
    group : [{
        groupId : String,
        groupName : String
    }],
    discussion : [{
        discussionId : Schema.Types.ObjectId, 
        classId : Schema.Types.ObjectId, 
        commentTitle : String, 
        time : Date
    }],
    project : [{
        projectId : Schema.Types.ObjectId, 
        classId : Schema.Types.ObjectId, 
        projectTitle : String, 
        likes : Number, 
        projectThumbnail : String
    }],
    registrationId : String
});

// url / db 이름
mongoose.connect('mongodb://localhost:27017/skill-share-db');

// 'collection name', schema <<< 자동적으로 collection name 을 plural 로 변환해준다 <<< 'users' 로 저장된다.
module.exports = mongoose.model('user', userSchema);