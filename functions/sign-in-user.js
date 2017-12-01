// mongo db
var mongoose = require('mongoose');
// http 통신
var request = require('request');
var user = require('../models/user');

exports.signIn = function(email, password, callback) {
    user.find({email : email, password : password}, {_id : true}, function(err, user) {
        if(user.length != 0) {
            callback({
                result : 'success',
                message : 'response : sign-in succeeded',
                userId : user[0]._id
            });
        } else {
            callback({
                result : 'failure',
                message : 'response : no account message'
            });
        }
    });
}