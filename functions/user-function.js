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
            console.log("following exists");
            var following = user.following[index];
            user.following.splice(index,1);
            console.log(following);

            user.save(function(err) {
                if(!err) {
                    callback(following)
                } else {
                    callback(null)
                }
            })
        } else {
            console.log("following not existed");

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