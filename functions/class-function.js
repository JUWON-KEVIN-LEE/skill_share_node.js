var mongoose = require('mongoose');
var classes = require('../models/classes');

exports.getLessons = function(classId, callback) {
    classes.findById("5a4f1afc83004e24a841ce16", function(err, clas) {
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
    classes.findById("5a4f1afc83004e24a841ce16", function(err, clas) {
        if(!err) {
            callback(clas.about);
        } else {
            callback(err);
        }
    })
}

exports.getDiscussions = function(classId, callback) {
    classes.findById("5a4f1afc83004e24a841ce16", function(err, clas) {
        if(!err) {
            classes.populate(clas, { path : 'discussions', model : 'discussion'}, function(err, clas) {
                callback(clas.discussions);
            });
        } else {
            callback(err);
        }
    })
}

exports.search = function(content, callback) {
    classes.find({title: { $regex: content}}, {_id: 1, imageUrl : 1, title : 1, tutorName:1, totalDuration : 1, reviewPercent : 1, subscriberCount : 1}, function(err, searchedClasses) {
        console.log(searchedClasses);
        callback(searchedClasses);
    })
}