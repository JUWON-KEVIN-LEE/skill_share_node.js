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
}