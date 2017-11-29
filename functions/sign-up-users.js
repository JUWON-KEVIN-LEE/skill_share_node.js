// mongo db
var mongoose = require('mongoose');
// http 통신
var request = require('request');
var user = require('../models/user');

exports.signUp = function(email, password, name, callback) {

    var newUser = new user({
        email : email,
        password : password,
        name : name,
    });

    user.find({email : email}, function(err, users) {
        if(users.length != 0) {
            callback('already registered email');
        } else {
            newUser.save(function(err) {
                if(!err) {
                    callback('register user success');
                } else {
                    callback('register user failed');
                }
            });
        }
    });
}