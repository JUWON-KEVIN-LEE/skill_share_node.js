var mongoose = require('mongoose');
var classes = require('../models/classes');

exports.getLessons = function(classId, callback) {
    classes.findById("5a3ca8f09efbc0255c7d1593", function(err, clas) {
        if(!err) {
            console.log("lessons response");
            callback(clas.lessons);
        } else {
            console.log("lessons error");
            callback(err);
        }
    })
};

exports.getAbout = function(classId, callback) {
    classes.findById("5a3ca8f09efbc0255c7d1593", function(err, clas) {
        if(!err) {
            callback(clas.about);
        } else {
            callback(err);
        }
    })
}

exports.getDiscussions = function(classId, callback) {
    classes.findById("5a3ca8f09efbc0255c7d1593", function(err, clas) {
        if(!err) {
            classes.populate(clas, { path : 'discussions', model : 'discussion'}, function(err, clas) {
                callback(clas.discussions);
            });
        } else {
            callback(err);
        }
    })
}