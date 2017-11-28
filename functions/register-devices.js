// mongo db
var mongoose = require('mongoose');
// http 통신
var request = require('request');
var device = require('../models/device');
// user
var user = require('../models/user');

// TODO 수정해야 됨 logic 을 잘 생각해보자!
exports.register = function(deviceName, deviceId, registrationId, callback) {

    var newDevice = new device({
        deviceName : deviceName,
        deviceId : deviceId,
        registrationId : registrationId
    });

    device.find({registrationId : registrationId}, function(err, devices) {
        var totalDevices = devices.length;
        if(totalDevices == 0) {
            newDevice.save(function(err) { 
                if(!err) {
                    callback('registraion success');
                } else {
                    callback('registraion failed');
                }
            });
        }
    });

    user.find({registrationId : registrationId}, function(err, users) {
        if(users.length == 0) {

        }
    });
}