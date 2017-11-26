var sendMessageFunction = require('../functions/send-message');
var registerFunction = require('../functions/register-devices');

module.exports = function(app, io) {
    app.get('/', function(req, res) {
        res.sendFile('index.html');
    });

    // device register
    app.post('/devices', function(req, res) {

        // retrofit interface 에 정의 : post >>> /devices >>> @Body RequestBody variables
        var deviceName = req.body.deviceName;
        var deviceId = req.body.deviceId;
        var registrationId = req.body.registrationId;

        // type 체크
        if( typeof deviceName == 'undefined' || typeof deviceId == 'undefined' || typeof registrationId == 'undefined' ) {
            // res.json('invalid type');
            res.send('invalid type');
        } else if( !deviceName.trim() || !deviceId.trim() || !registrationId.trim() ) { // 앞뒤로 공백 제거하고 null 이면
            // res.json('empty message');
            res.send('empty message');
        } else {
            registerFunction.register( deviceName, deviceId, registrationId, function(result) {
                // res.json(result);
                res.send(result);
            });
        }
    });

    // gcm
    app.post('/send', function(req, res) {
        var message = req.body.message;
        var registrationId = req.body.registrationId;

        sendMessageFunction.sendMessage(message, registrationId, function(result) {
            // res.json(result);
            res.send(result);
        });
    });
}