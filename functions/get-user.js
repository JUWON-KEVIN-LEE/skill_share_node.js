// mongo db
var mongoose = require('mongoose');
var users = require('../models/users');

exports.getUser = function(userId, callback) {
    users.findById(userId, function(err, user) {
        callback(user);
    });
};