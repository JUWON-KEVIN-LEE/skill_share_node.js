var mongoose = require('mongoose');
var users = require('../models/users');

exports.signUp = function(email, password, name, callback) {
    
        var newUser = new users({
            email : email,
            password : password,
            name : name,
        });
    
        users.find({email : email}, function(err, user) {
            if(user.length != 0) {
                callback({
                    result : 'failure',
                    message : 'response : already existed email address',
                });
            } else {
                newUser.save(function(err, user) {
                    if(!err) {
                        callback({
                            result : 'success',
                            message : 'response : sign-up succeeded',
                            user : user
                        });
                    } else {
                        callback({
                            result : 'failure',
                            message : 'response : sign-up failed by error & ' + err
                        });
                    }
                });
            }
        });
}

exports.signIn = function(email, password, callback) {
    users.find({email : email, password : password}, function(err, user) {
        if(user.length != 0) {
            console.log("Sign In");
            callback({
                result : 'success',
                message : 'response : sign-in succeeded',
                user : user[0]
            });
        } else {
            callback({
                result : 'failure',
                message : 'response : no account message'
            });
        }
    });
}

exports.getUser = function(userId, callback) {
    users.findById(userId, function(err, user) {
        callback(user);
    });
};

exports.followOrUnfollow = function(userId, tutor, callback) {
    users.findById(userId, function(err, user) {
        var index = -1;

        for(var i=0; i<user.following.length; i++) {
            if(user.following[i].userId == tutor.tutorId) {
                index = i;
                break;
            }
        }
        
        if(index >= 0) {
            var following = user.following[index];
            user.following.splice(index,1);

            user.save(function(err) {
                if(!err) {
                    callback(following)
                } else {
                    callback(null)
                }
            })
        } else {
            user.following.push({
                userId : tutor.tutorId,
                name : tutor.name,
                imageUrl : tutor.imageUrl
            });

            user.save(function(err, user) {
                if(!err) {
                    console.log("succeed");
                    callback(user.following[user.following.length-1])
                } else {
                    console.log("failed");
                    callback(null)
                }
            });
        }
    });
}

exports.joinGroup = function(group, userId, callback) {
    users.findById(userId, function(err, user) {
        user.groups.push({
            groupId : group._id,
            groupName : group.groupName,
            groupThumbnail : group.groupThumbnail,
            memberCount : group.memberCount
        });

        user.save(function(err) {
            if(!err) {
                console.log("success");
                callback({
                    result : 'success',
                    message : 'response : join group succeeded',
                })
            } else {
                callback({
                    result : 'failure',
                    message : 'response : join group failed',
                })
            }
        })
    })
}

exports.setNickname = function(userId, nickname, callback) {
    users.findById(userId, function(err, user) {
        user.nickname = nickname;

        user.save(function(err) {
            if(!err) {
                callback({
                    result : 'success',
                    message : 'server response : set nickname succeeded',
                })
            } else {
                callback({
                    result : 'failure',
                    message : 'server response : set nickname failed',
                })
            }
        });
    });
}

exports.setImageUrl = function(userId, path, callback) {
    users.findById(userId, function(err, user) {
        user.imageUrl = path;

        user.save(function(err) {
            if(!err) {
                callback({
                    result : 'success',
                    message : 'server response : set image url succeeded',
                })
            } else {
                callback({
                    result : 'failure',
                    message : 'server response : set image url failed',
                })
            }
        });
    });
}