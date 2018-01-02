// gcm
var gcmFunction = require('../functions/gcm-function');
// user
var userFunction = require('../functions/user-function');
// main
var home = require('../constants/home');
// class
var classFunction = require('../functions/class-function');
// discussion
var discussionFunction = require('../functions/discussions-function');

// TODO
var streamVideo = require('../functions/stream-video');

// mongoose temp for saving class
var mongoose = require('mongoose');
var classes = require('../models/classes');

module.exports = function(app) {

    app.get('/ncls', function(req, res) {

        var newClass = new classes({
            title : "Going Freelance: Building and Branding Your Own Success",
            imageUrl : "https://static.skillshare.com/uploads/video/thumbnails/00da9ecbdcff6b3720dcc633f4ab0e22/448-252",
            tutorName : "Justin Gignac",
            totalDuration : "3060000",
            lessons : {
                title : "Going Freelance: Building and Branding Your Own Success",
                totalDuration : "3060000",
                reviewPercent : "99", 
                subscriberCount : "267",
                tutor : {
                    tutorId : "Justin Gignac's ID",
                    name : "Justin Gignac",
                    followers : "2359",
                    imageUrl : "https://graph.facebook.com/840760701/picture?type=normal"
                },
                videos : [{
                    _id : "temp",
                    title : "Let's Go!",
                    duration : "116000",
                    thumbnailUrl : "http://s3.amazonaws.com/skillshare/uploads/parentClasses/2f4f5efd1d503e7131249c94cf2ed7bc/681a4bd7",
                    order : "0"
                },
                {
                    _id : "temp",
                    title : "Your Mission: Why You're Here",
                    duration : "191000",
                    thumbnailUrl : "https://static.skillshare.com/uploads/project/95045c8c57d1227a6cfb442bd5d3661d/219967c6",
                    order : "1"
                },
                {
                    _id : "temp",
                    title : "The Power of Side Projects",
                    duration : "510000",
                    thumbnailUrl : "https://static.skillshare.com/uploads/project/d00cdd4401224eb969fc135174b89135/b6adbd89",
                    order : "2"
                },
                {
                    _id : "temp",
                    title : "Things All Great Portfolios Do",
                    duration : "339000",
                    thumbnailUrl : "https://static.skillshare.com/uploads/project/91698/cover_800_28f0ed9b189297e1a13c6bc6cb444eca.jpg",
                    order : "3"
                }]
            },
            about : {
                    projects : [
                        {
                            projectId : "project ID 1",
                            imageUrl : "https://static.skillshare.com/uploads/project/d00cdd4401224eb969fc135174b89135/3bbd9b77"
                        }
                    ],
                    reviews : [{
                        likeOrNot : "like",
                        content : "This is first reviews",
                        reviewerId : "temp ID",
                        reviewerName : "Great Healthy",
                        imageUrl : "https://static.skillshare.com/uploads/project/61144/cover_800_e10d97be1e6045c496651c90efd59572.jpg"
                    }],
                    subscribers : [
                    {
                        subscriberId : "James ID",
                        name : "James",
                        imageUrl : "http://img2.sbs.co.kr/img/sbs_cms/CH/2016/06/06/CH92438362_w300_h300.jpg"
                    },
                    {
                        subscriberId : "ChicChoc ID",
                        name : "ChicChoc",
                        imageUrl : "http://img2.sbs.co.kr/img/sbs_cms/CH/2016/06/06/CH82423479_w300_h300.jpg"
                    },
                    {
                        subscriberId : "Butter Waffle ID",
                        name : "Butter Waffle",
                        imageUrl : "https://i.ytimg.com/vi/eqEcRwmV2vU/maxresdefault.jpg"
                    },
                    {
                        subscriberId : "Computer ID",
                        name : "Computer",
                        imageUrl : "http://blogimg.ohmynews.com/attach/26495/1372921881.jpg"
                    },
                    {
                        subscriberId : "Apple ID",
                        name : "Apple",
                        imageUrl : "http://cfile23.uf.tistory.com/image/9907AF3359C0C1153C71D2"
                    }
                    ],
                    relatedClasses : [{
                        classId : "class ID 1",
                        thumbnailUrl : "https://cdn-images-1.medium.com/max/2000/1*7pjzaWKedACc3-olWUghLg.png",
                        title : "iOS Design I: Getting Started with UX",
                        tutorName : "Kara Hodecker"
                    }, {
                        classId : "class ID 2",
                        thumbnailUrl : "https://learn.canva.com/wp-content/uploads/2015/10/40-People-Through-History-Who-Changed-Design-For-Good-04.png",
                        title : "Getting Started with Sketch: Design a Beautiful App",
                        tutorName : "Christian Krammer"
                    }, {
                        classId : "class ID 3",
                        thumbnailUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIeQXRYXiQyOD3f_Kbw3lvlvo92XMcMImEJrqcwKq1JliJQkfj",
                        title : "Mobile App Prototyping",
                        tutorName : "Noah Levin"
                    }]
            },
            discussions : []
        });

        newClass.save(function(err, clas) {
            if(err) {
                res.send("save class error : " + err);
            } else {
                res.send("saved class success : " + clas);
            }
        });
    });

    // user
    app.get('/user/:id', function(req, res) {
        var userId = req.params.id;
        userFunction.getUser(userId, function(result) {
            res.json(result);
        });
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
             userFunction.signUp( email, password, name, function(result) {
                 res.json(result);
             });
         }
     });

    app.get('/users/sign-in', function(req, res) {
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
            userFunction.signIn( email, password, function(result) {
                res.json(result);
            });
        }
    });

    // main
    app.get('/home', function(req, res) {
        var list = req.query.types;
        
        var resList = [];

        resList.push(home.f);

        // if(list.indexOf("f") >= 0) { <<< follow skills check
        // }

        resList.push(home.b);
        resList.push(home.t);

        res.json(resList);
    });

    app.get('/group', function(req, res) {
        res.json(require('../constants/group'));
    });

    app.get('/discover', function(req, res) {
        res.json(require('../constants/discover'));
    });

    // class
    app.get('/class/lessons/:id', function(req, res) {
        var classId = req.params.id;

        classFunction.getLessons(classId, function(result) {
            res.json(result);
        });
    });

    app.get('/class/about/:id', function(req, res) {
        var classId = req.params.id;

        classFunction.getAbout(classId, function(result) {
            res.json(result);
        });
    });

    app.get('/class/discussions/:id', function(req, res) {
        var classId = req.params.id;

        classFunction.getDiscussions(classId, function(result) {
            res.json(result);
        });
    });

    // discussion
    app.post('/class/sendDiscussion', function(req, res) {
        var classId = req.query.classId;
        var discussion = req.body;
        
        discussionFunction.sendDiscussion(discussion, classId, function(result) {
            res.json(result);
        });
    });

    app.post('/discussions/addReply', function(req, res) {
        var discussionId = req.query.discussionId;
        var reply = req.body;

        console.log("dicussionId : " + discussionId);

        discussionFunction.addReply(reply, discussionId, function(result) {
            res.json(result);
        });
    });

    app.get('class/video/:id', function(req, res) {
        res.send();
    });

    // Google Cloud Messaging
    app.post('/device/register', function(req, res) { // device register
        // retrofit interface 에 정의 : post >>> /devices >>> @Body RequestBody variables
        var userId = req.body.userId;
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
            gcmFunction.register( userId, registrationId, function(result) {
                res.json(result);
            });
        }
    });

    app.post('/send', function(req, res) { // send Message
        var userName = req.body.userName;
        var userId = req.body.userId;
        var message = userName + " 님이 회원님의 글을 좋아합니다."

        gcmFunction.sendMessage(message, userId, function(result) {
            res.json(result);
        });
    });
}