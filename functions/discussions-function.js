var mongoose = require('mongoose');
var discussions = require('../models/discussions');
var classes = require('../models/classes');

exports.sendDiscussion = function(sendedDiscussion, classId, callback) {

    var newDiscussion = new discussions({
        content : sendedDiscussion.content,
        time : sendedDiscussion.time,
        likeCount : sendedDiscussion.likeCount,
        userId : sendedDiscussion.userId,
        name : sendedDiscussion.name,
        imageUrl : sendedDiscussion.imageUrl,
        resId : sendedDiscussion.resId,
        likeUsersIds : [],
        replies : []
    });


    var discussionId;

    newDiscussion.save( function(err, discussion) {
        discussionId = discussion._id;

        classes.findById("5a4f1afc83004e24a841ce16", function(err, clas) {
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

exports.addReply = function(reply, discussionId, callback) {

    var newReply = {
        name : reply.name,
        imageUrl : reply.imageUrl,
        content : reply.content,
        time : reply.time
    };

    discussions.findById(discussionId, function(err, discussion) {
        if(!err) {
            discussion.replies.push(newReply);
            discussion.save(function(err) {
                if(!err) {
                    callback(discussion.replies);
                } else {
    
                }
            });
        }
    });
}

exports.like = function(discussionId, userId, callback) {
    discussions.findById(discussionId, function(err, discussion) {
        if(!err) {
            discussion.likeUsersIds.push(userId);
            discussion.likeCount = discussion.likeUsersIds.length+"";
            discussion.save(function(err, discussion) {
                if(!err) {
                    var result = discussion.likeCount;
                    callback({
                        result
                    });
                }
            })
        }
    });
}

exports.unlike = function(discussionId, userId, callback) {
    discussions.findById(discussionId, function(err, discussion) {
        if(!err) {
            var index = discussion.likeUsersIds.indexOf(userId);
            discussion.likeUsersIds.splice(index, 1);
            discussion.likeCount = discussion.likeUsersIds.length+"";
            discussion.save(function(err, discussion) {
                if(!err) {
                    var result = discussion.likeCount;
                    callback({
                        result
                    });
                }
            })
        }
    });
}