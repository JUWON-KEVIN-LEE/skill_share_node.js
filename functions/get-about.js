var mongoose = require('mongoose');
var classes = require('../models/classes');

exports.getAbout = function(classId, callback) {
    classes.findById("5a3ca8f09efbc0255c7d1593", function(err, clas) {
        if(!err) {
            callback(clas.about);
        } else {
            callback(err);
        }
    })
}