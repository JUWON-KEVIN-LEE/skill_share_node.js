var gcm = require('node-gcm');
var server_api_key = 'AIzaSyCqb0GH5XObY3AwpOxBF4JqHTadmbR5esY';
var device = require('../models/device');

exports.sendMessage = function(message, userId, callback) {
    var message = new gcm.Message({data: {message: message}});

    device.find({userId : userId}, function(err, device) {
        if(device.length != 0) {
            for(var i=0; i<device.length; i++) {
                resIds.push(device.resId);
            }
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


// var registrationId = '329389450005'; // TODO input token value