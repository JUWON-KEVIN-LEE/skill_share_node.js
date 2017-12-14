// mongo db
var mongoose = require('mongoose');
var user = require('../models/user');

exports.getUser = function(userId, callback) {
    user.find({_id : userId}, function(err, user) {
        callback({
            "_id" : "user[0]._id"
        });
    });
};