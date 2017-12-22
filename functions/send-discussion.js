// mongo db
var mongoose = require('mongoose');
var discussion = require('../models/discussions');
var classes = require('../models/classes');

exports.sendDiscussion = function(sendedDiscussion, classId, callback) {

    var newDiscussion = new discussion({
        content : sendedDiscussion.content,
        time : sendedDiscussion.time,
        likeCount : sendedDiscussion.likeCount,
        userId : sendedDiscussion.userId,
        name : sendedDiscussion.name,
        imageUrl : sendedDiscussion.imageUrl,
        resId : sendedDiscussion.resId,
        replies : []
    });


    var discussionId;

    newDiscussion.save( function(err, discussion) {
        discussionId = discussion._id;

        classes.findById("5a3b4c4731d8733de8678a99", function(err, clas) {
            clas.discussions.push(discussionId);

            clas.save(function(err) {
                if(!err) {
                    classes.populate(clas, { path : 'discussions', model : 'discussion'}, function(err, clas) {
                        callback(clas.discussions);
                    });
                } else {
                    console.log("send new discussion error : " + err);
                    callback(clas.discussions);
                }
            });
        });
    });
}