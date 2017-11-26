
exports.register = function(deviceName, deviceId, registrationId, callback) {
    console.log('device name : ' + deviceName + 
    ', id : ' + deviceId + ', reg_id : ' + registrationId);

    callback('message about success or failure');
    /*
    var newDevice = new Device({
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
    */
}

// var mongoose = require('mongoose');
// var device = require('../models/device');