var gcm = require('node-gcm');
var server_api_key = 'AIzaSyCqb0GH5XObY3AwpOxBF4JqHTadmbR5esY';

exports.sendMessage = function(message, registrationId, callback) {
    var message = new gcm.Message({data: {message: message}});
    console.log("message : " + message);
    var registrationIds = [];
    registrationIds.push(registrationId);
    console.log("registrationId : " + registrationId);
    var sender = new gcm.Sender(server_api_key);
    sender.send( message, registrationIds, function(err, response) {

        if(err) {
            console.log(err);
            callback('message send fail');
        } else {
            console.log(response);
            callback('message send success');
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