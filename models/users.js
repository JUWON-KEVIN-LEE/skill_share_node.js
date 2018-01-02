var mongoose = require('mongoose');

// Schema <<< document 구조를 보여준다
var Schema = mongoose.Schema;

// Schema type : String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
var userSchema = mongoose.Schema({
    email : String,
    password : String,
    followingSkills : [String],
    name : String,
    nickname : String,
    pictureUrl : String,
    following : [{ 
        userId : String,
        name : String, 
        photoUrl : String 
    }],
    followers : [{
        userId : String, 
        name : String, 
        photoUrl : String 
    }],
    subsribedClass : [{ 
        classId : String,
        title : String, 
        tutorName : String, 
        totalDuration : String,
        feedback : String,
        views : Number, // String or Number
        classThumbnail : String
    }],
    group : [{
        groupId : String,
        groupName : String,
        groupThumbnail : String,
        memberCount : String
    }],
    discussion : [{
        discussionId : String,
        classId : String,
        commentTitle : String,
        time : String
    }],
    project : [{
        projectId : String, 
        classId : String,
        classTitle : String,
        projectTitle : String, 
        likes : Number, 
        projectThumbnail : String
    }],
    registrationId : String
}, {'strict' : false, 'versionKey' : false});

// url / db 이름
mongoose.connect('mongodb://localhost:27017/skill-share-db');

// 'collection name', schema <<< 자동적으로 collection name 을 plural 로 변환해준다 <<< 'users' 로 저장된다.
module.exports = mongoose.model('user', userSchema);