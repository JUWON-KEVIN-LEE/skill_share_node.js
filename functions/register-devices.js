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

    // [ issue ] device 가 여러 개일수도 있다....
    device.find({userId : userId}, {registrationId : true}, function(err, device) {
        if(device.length == 0) {
            newDevice.save(function(err) { 
                if(!err) {
                    callback({
                        result : 'success',
                        message : 'request : registraion succeeded'
                    });
                } else {
                    callback({
                        result : 'success',
                        message : 'request : registration failed by error & ' + err
                    });
                }
            });
        } else {
            // 기존에 등록되어 있었으면..
            if(device.indexOf({registrationId : registrationId}) > -1) {
                callback({
                    result : 'failure',
                    message : 'request : already registered device'
                });
            } else {
                newDevice.save(function(err) { 
                    if(!err) {
                        callback({
                            result : 'success',
                            message : 'request : registraion succeeded'
                        });
                    } else {
                        callback({
                            result : 'failure',
                            message : 'request : registration failed by error & ' + err
                        });
                    }
                });
            }
        }
    });

    user.findByIdAndUpdate(
        userId,
        { $set: {"registraionId" : [registrationId] } },
        {'new' : true, 'upsert' : true, 'safe' : true},
        function(err, result) {
            if(err) {
                console.log("error : " + err)
            }   
            console.log("result : " + result);
        });
}