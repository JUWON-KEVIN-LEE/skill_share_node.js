// mongo db
var mongoose = require('mongoose');
// http 통신
var request = require('request');
var device = require('../models/device');

exports.register = function(deviceName, deviceId, registrationId, callback) {

    var newDevice = new device({
        deviceName: deviceName,
        deviceId: deviceId,
        registrationId: registrationId
    });

    device.find({registrationId: registrationId}, function(err, devices) {
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
}