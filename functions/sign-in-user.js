// mongo db
var mongoose = require('mongoose');
var users = require('../models/users');

exports.signIn = function(email, password, callback) {
    users.find({email : email, password : password}, {_id : true}, function(err, user) {
        if(user.length != 0) {
            console.log("Sign In");
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