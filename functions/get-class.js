var mongoose = require('mongoose');
var classes = require('../models/class'); // class 사용 불가 >>> classes 복수 사용

exports.getClass = function(classId, callback) {
    classes.find({_id : classId}, function(err, classes) {
        if( classes.length != 0) {
            callback(classes[0]);
        }
    });
};