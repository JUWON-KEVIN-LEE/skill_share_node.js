var sendMessageFunction = require('../functions/send-message');
var registerDeviceFunction = require('../functions/register-devices');
var signUpUserFunction = require('../functions/sign-up-user');
var signInUserFunction = require('../functions/sign-in-user');

module.exports = function(app, io) {
    console.log("hello node");
    app.get('/', function(req, res) {
        res.sendFile('index.html');
    });

    // device register
    app.post('/device/register', function(req, res) {

        // retrofit interface 에 정의 : post >>> /devices >>> @Body RequestBody variables
        var userId = req.body.userId;
        var deviceName = req.body.deviceName;
        var deviceId = req.body.deviceId;
        var registrationId = req.body.registrationId;

        // type 체크
        if( typeof userId == 'undefined' || typeof deviceName == 'undefined' || typeof deviceId == 'undefined' || typeof registrationId == 'undefined' ) {
            res.json({ // TODO <<< json 파일로 응답형식 만들어놓고 사용하기
                result : 'failure',
                message : 'request : invalid value type'
            });
        } else if( !userId.trim() || !deviceName.trim() || !deviceId.trim() || !registrationId.trim() ) { // 앞뒤로 공백 제거하고 null 이면
            res.json({
                result : 'failure',
                message : 'request : empty value'
            });
        } else {
            registerDeviceFunction.register( userId, deviceName, deviceId, registrationId, function(result) {
                console.log(result);
                res.json(result);
            });
        }
    });

    app.get('/user/sign-in', function(req, res) {
        var email = req.query.email;
        var password = req.query.password;
        
        if( typeof email == 'undefined' || typeof password == 'undefined' ) {
            res.json({ // TODO <<< json 파일로 응답형식 만들어놓고 사용하기
                result : 'failure',
                message : 'request : invalid value type'
            });
        } else if( !email.trim() || !password.trim() ) {
            res.json({
                result : 'failure',
                message : 'request : empty value'
            });
        } else {
            signInUserFunction.signIn( email, password, function(result) {
                res.json(result);
            });
        }
    });

    app.post('/user/sign-up', function(req, res) {
       var email = req.body.email;
       var password = req.body.password;
       var name = req.body.name;
       
        if( typeof email == 'undefined' || typeof password == 'undefined' || typeof name == 'undefined' ) {
            res.json({
                result : 'failure',
                message : 'request : invalid value type'
            });
        } else if( !email.trim() || !password.trim() || !name.trim() ) { // 앞뒤로 공백 제거하고 null 이면
            res.json({
                result : 'failure',
                message : 'request : empty value'
            });
        } else {
            signUpUserFunction.signUp( email, password, name, function(result) {
                res.json(result);
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