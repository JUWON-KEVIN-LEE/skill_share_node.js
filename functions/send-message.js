var gcm = require('node-gcm');
var server_api_key = 'AIzaSyCqb0GH5XObY3AwpOxBF4JqHTadmbR5esY';

exports.sendMessage = function(message, resId, callback) {
    var message = new gcm.Message({data: {message: message}});
    var registrationIds = [];
    registrationIds.push(resId);
    var sender = new gcm.Sender(server_api_key);
    
    sender.send( message, registrationIds, function(err, response) {

        if(err) {
            console.log("error : " + err);
            callback({
                result : 'failure',
                message : 'response : message send failed by error & ' + err
            });
        } else {
            console.log("response : " + response);
            callback({
                result : 'success',
                message : 'response : message send succeed'
            });
        }

    });
}

/*
var message = new gcm.Message({
    collapseKey: 'test',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        key: 'push Test',
    }
});

var registrationId = '329389450005'; // TODO input token value
*/