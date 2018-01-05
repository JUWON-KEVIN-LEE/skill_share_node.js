var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lessonsSchema = new Schema({
    
}, {versionKey : false});

var aboutSchema = new Schema({
    
}, {versionKey : false});

var classSchema = new Schema({
    title : String,
    imageUrl : String,
    tutorName : String,
    totalDuration : String,
    lessons : {
        title : String,
        totalDuration : String,
        reviewPercent : String,
        subscriberCount : String,
        tutor : { 
            tutorId : String,
            name : String,
            followers : String,
            imageUrl : String
        },
        videos : [{
            url : String,
            title : String,
            duration : String,
            thumbnailUrl : String,
            order : String
        }]
    },
    about : {
        projects : [{ 
            projectId : String,
            imageUrl : String
        }],
        reviews : [{
            likeOrNot : String,
            content : String,
            reviewerId : String,
            reviewerName : String,
            imageUrl : String
        }],
        subscribers : [{ 
            subscriberId : String,
            imageUrl : String,
            name : String
        }],
        relatedClasses : [{
            classId : String,
            thumbnailUrl : String,
            title : String,
            tutorName : String
        }]
    },
    discussions : [{ type : Schema.Types.ObjectId, ref : 'discussion'}]
}, {versionKey : false});

module.exports = mongoose.model('class', classSchema);
//---------------------------------------Class db모델---------------------------------------- 