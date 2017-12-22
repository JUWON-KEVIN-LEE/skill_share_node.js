// mongo db
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
            newUser.save(function(err) {
                if(!err) {
                    callback({
                        result : 'success',
                        message : 'response : sign-up succeeded'
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