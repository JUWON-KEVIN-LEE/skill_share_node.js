var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lessonsSchema = new Schema({
    title : String,
    totalDuration : String,
    reviewPercent : String,
    subscriberCount : String,
    tutor : { type : Schema.Types.ObjectId, ref : 'tutor' },
    videos : [{
        title : String,
        duration : String,
        thumbnailUrl : String,
        order : String
    }]
}, {versionKey : false});

module.exports = mongoose.model('lesson', lessonsSchema);