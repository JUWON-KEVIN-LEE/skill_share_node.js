var mongoose = require('mongoose');
var groups = require('../models/groups');

exports.getComments = function(groupId, position, callback) {
    console.log("groupId : " + groupId);
    groups.findById(groupId, function(err, group) {
        if(!err) {
            var result = [];

            console.log("group : " + group);
            
            if(position + 20 > group.comments.length) {
                for(var i=position; i<group.comments.length; i++) {
                    result.push(group.comments[i]);
                }
            } else {
                for(var i=position; i<position + 20; i++) {
                    result.push(group.comments[i]);
                }
            }
            
            console.log("result : " + result);

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