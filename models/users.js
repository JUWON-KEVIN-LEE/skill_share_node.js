var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
    groupId : String,
    groupName : String,
    groupThumbnail : String,
    memberCount : String
}, {_id : false});

// Schema type : String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
var userSchema = mongoose.Schema({
    email : String,
    password : String,
    followingSkills : [String],
    name : String,
    nickname : String,
    pictureUrl : String,
    following : [{ 
        _id : false,
        field : {
            userId : String, 
            name : String, 
            imageUrl : String
        }
    }],
    followers : [{
        _id : false,
        field : {
            userId : String, 
            name : String, 
            imageUrl : String
        }
    }],
    subsribedClass : [{ 
        _id : false,
        field : {
            classId : String,
            imageUrl : String,
            title : String, 
            tutorName : String, 
            totalDuration : String,
            reviewPercent : String,
            subscriberCount : String // String or Number
        }
    }],
    groups : [{
        groupSchema
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