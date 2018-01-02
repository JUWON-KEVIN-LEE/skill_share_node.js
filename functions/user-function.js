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