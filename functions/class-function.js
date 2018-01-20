var mongoose = require('mongoose');
var classes = require('../models/classes');

exports.getLessons = function(classId, callback) {
    classes.findById("5a4f1afc83004e24a841ce16", function(err, clas) {
        if(!err) {
            callback(clas.lessons);
        } else {
            callback(err);
        }
    })
};

exports.getAbout = function(classId, callback) {
    classes.findById("5a4f1afc83004e24a841ce16", function(err, aClass) {
        if(!err) {
            var subscribers = aClass.about.subscribers;

            if(subscribers.length > 10) {
                var partOfSubscribers;
                for(var i=0; i<20; i++) {
                    partOfSubscribers.push(subscribers[i]);
                }
                aClass.about.subscribers = partOfSubscribers;
            }

            callback(aClass.about);
        } else {
            callback(err);
        }
    })
}

exports.getSubscribers = function(classId, position, callback) {
    classes.findById(classId, function(err, aClass) {
        if(!err) {
            var subscribers = aClass.about.subscribers;
            
            var partOfSubscribers;
            if(subscribers.length >= position + 20) {
                for(var i=position; i<position+20; i++) {
                    partOfSubscribers.push(subscribers[i]);
                }
            } else {
                for(var i=position; i<subscribers.length; i++) {
                    partOfSubscribers.push(subscribers[i]);
                }
            }
            
            callback(partOfSubscribers);
        } else {
            callback({
                result : "failure"
            });
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