var sendMessageFunction = require('../functions/send-message');
var registerDeviceFunction = require('../functions/register-devices');
var signUpUserFunction = require('../functions/sign-up-users');

module.exports = function(app, io) {
    app.get('/', function(req, res) {
        res.sendFile('index.html');
    });

    // device register
    app.post('/device', function(req, res) {

        // retrofit interface 에 정의 : post >>> /devices >>> @Body RequestBody variables
        var deviceName = req.body.deviceName;
        var deviceId = req.body.deviceId;
        var registrationId = req.body.registrationId;

        // type 체크
        if( typeof deviceName == 'undefined' || typeof deviceId == 'undefined' || typeof registrationId == 'undefined' ) {
            res.send('invalid type');
        } else if( !deviceName.trim() || !deviceId.trim() || !registrationId.trim() ) { // 앞뒤로 공백 제거하고 null 이면
            res.send('empty');
        } else {
            registerDeviceFunction.register( deviceName, deviceId, registrationId, function(result) {
                res.send(result);
            });
        }
    });

    app.post('/user', function(req, res) {
       var email = req.body.email;
       var password = req.body.password;
       var name = req.body.name;
       
        if( typeof email == 'undefined' || typeof password == 'undefined' || typeof name == 'undefined' ) {
            res.send('invalid type');
        } else if( !email.trim() || !password.trim() || !name.trim() ) { // 앞뒤로 공백 제거하고 null 이면
            res.send('empty');
        } else {
            signUpUserFunction.signUp( email, password, name, function(result) {
                res.send(result);
        });
    }
    });

    // gcm
    app.post('/send', function(req, res) {
        var message = req.body.message;
        var registrationId = req.body.registrationId;

        sendMessageFunction.sendMessage(message, registrationId, function(result) {
            res.send(result);
        });
    });
}