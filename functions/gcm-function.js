// gcm
var gcm = require('node-gcm');
var server_api_key = 'AIzaSyCqb0GH5XObY3AwpOxBF4JqHTadmbR5esY'; // constants
// mongo
var mongoose = require('mongoose');
var devices = require('../models/devices');
var users = require('../models/users');

exports.sendMessage = function(message, userId, callback) {
    var message = new gcm.Message({data: {message: message}});

    devices.find({userId : userId}, function(err, device) {
        if(device.length != 0) {
            var resIds = [];
            resIds.push(device[0].registrationId);

            var sender = new gcm.Sender(server_api_key);
            sender.send( message, resIds, function(err, response) {
                if(err) {
                    callback({
                        result : 'failure',
                        message : 'response : message send failed by error & ' + err
                    });
                } else {
                    callback({
                        result : 'success',
                        message : 'response : message send succeed'
                    });
                }
            });
        } else {
            callback({
                result : 'failure',
                message : 'response : message send failed because of not registered device'
            });
        }
    })
}

exports.register = function(userId, registrationId, callback) {
        devices.find({userId : userId, registrationId : registrationId}, function(err, device) {
            if(device.length == 0) {

                var newDevice = new device({
                    userId : userId,
                    registrationId : registrationId
                });

                newDevice.save(function(err) { 
                    if(!err) {
                        callback({
                            result : 'success',
                            message : 'response : registraion succeeded'
                        });
                        users.findById(userId, function(err, user) {
                            user.resId = registrationId;
                            user.save(function(err) {
                                if(err)
                                    console.log("user register error : " + err);
                            });
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
}