var mongoose = require('mongoose');
var groups = require('../models/groups');

exports.getComments = function(groupId, position, callback) {
    console.log("gId : " + groupId);
    console.log("position : " + position);
    groups.findById(groupId, function(err, group) {
        if(!err) {
            var result = [];

            if( group.comments.length - position < 20) {
                console.log("under 20");
                for(var i=group.comments.length-1-position; i>=0; i--) {
                    result.push(group.comments[i]);
                }
            } else {
                console.log("above 20");
                for(var i=group.comments.length-1-position; i>group.comments.length-21-position; i--) {
                    result.push(group.comments[i]);
                }
            }
            
            callback(result);
        } else {
            console.log("error : " + err);
        }
    });
};

exports.sendComment = function(groupName, comment, callback) {
    groups.findOne({groupName : groupName}, function(err, group) {
        if(!err) {
            group.comments.push(comment);

            group.save(function(err) {
                if(!err) {
                    callback({
                        result : "success",
                        message : "send comment succeed."
                    })
                } else {
                    callback({
                        result : "failure",
                        message : "send comment failed."
                    })
                }
            })
        }
    });
};