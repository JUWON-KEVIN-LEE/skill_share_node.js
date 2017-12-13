var sendMessageFunction = require('../functions/send-message');
var registerDeviceFunction = require('../functions/register-devices');
var signUpUserFunction = require('../functions/sign-up-user');
var signInUserFunction = require('../functions/sign-in-user');
var streamVideo = require('../functions/stream-video');
var home = require('../constants/home');

module.exports = function(app) {

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
        var userName = req.body.userName;
        var userId = req.body.userId;
        var message = userName + " 님이 회원님의 글을 좋아합니다."

        sendMessageFunction.sendMessage(message, userId, function(result) {
            res.json(result);
        });
    });

    app.get('/class/home', function(req, res) {
        var list = req.query.types;
        
        res.json(home.best_this_month);
    });

    app.get('/class/discussions/:id', function(req, res) {
        var id = req.params.id;
        console.log("id");
        res.json([
            {
                _id : "id1",
                name : "Jonathan",
                pictureUrl : "http://pds.joins.com/news/component/htmlphoto_mmdata/201706/05/65f78b68-89f2-4add-8ff8-8c2b1b25be53.jpg",
                content : "앱을 만들 때 가장 중요하다고 생각하시는 부분이 어느 부분인가요? 테스트 해보고 싶은 부분이 있군요. 다섯줄을 넘겨야만 합니다. " +
                        "어디까지 써야 다섯줄을 넘길 수 있을까요? 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. " +
                        "무궁화 삼천리 화려가앙산 대한사람 대한으로 길이 보전하세. 남산 위에 저 소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세",
                time : "1212125215123719283",
                likeCount : "0",
                userId : "userId1",
                replies : []
            },
            {
                _id : "id2",
                name : "Coach",
                pictureUrl : "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory&fname=http%3A%2F%2Fcfile21.uf.tistory.com%2Fimage%2F216FB64E5639CB96315B1B",
                content : "도대체 앱 디자인은 어떻게 하는거죠?",
                time : "1012125215123719283",
                likeCount : "1",
                userId : "userId2",
                replies : []
            },
            {
                _id : "id3",
                name : "Jane",
                pictureUrl : "https://pbs.twimg.com/profile_images/908706663519051776/84pGO2Zl.jpg",
                content : "Hello guys. Pleased to meet you.",
                time : "912125215123719283",
                likeCount : "2",
                userId : "userId3",
                replies : [
                    {
                        name : "kevin Lee",
                        pictureUrl : "http://image.chosun.com/sitedata/image/201508/06/2015080603367_0.jpg",
                        content : "Actually this is test comment.",
                        time : "12125215123719283"
                    },
                    {
                        name : "kevin Lee",
                        pictureUrl : "http://image.chosun.com/sitedata/image/201508/06/2015080603367_0.jpg",
                        content : "hello!!",
                        time : "10125215123719283"
                    }
                ]
            }
        ]); // test 결과 잘 넘어감... 위 순서대로 들어감 0 , 1 , 2...
    });

    app.get('class/video/:id', function(req, res) {
        res.send();
    });
}