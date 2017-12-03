// mongo db
var mongoose = require('mongoose');
// http 통신
var request = require('request');
var device = require('../models/device');
// user
var user = require('../models/user');

exports.register = function(userId, deviceName, deviceId, registrationId, callback) {

    var newDevice = new device({
        userId : userId,
        deviceName : deviceName,
        deviceId : deviceId,
        registrationId : registrationId
    });

    device.find({userId : userId, registrationId : registrationId}, function(err, device) {
        console.log("device : " + device);
        if(device.length == 0) {
            newDevice.save(function(err) { 
                if(!err) {
                    callback({
                        result : 'success',
                        message : 'response : registraion succeeded'
                    });
                } else {
                    callback({
                        result : 'failure',
                        message : 'response : registration failed by error & ' + err
                    });
                }
            });
        } else {
            callback({
                result : 'failure',
                message : 'response : registration failed already registered device'
            });
        }
    });

    user.findByIdAndUpdate(
        userId,
        { $push : {registrationId : registrationId} },
        // 'new' : true,
        { 'upsert' : true, 'safe' : true},
        function(err, result) {
            if(err) {
                console.log("error : " + err)
            }   
            console.log("result : " + result);
        });
}