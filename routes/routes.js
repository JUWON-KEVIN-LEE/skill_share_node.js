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
var groupFunction = require('../functions/group-function');

// TODO
var streamVideo = require('../functions/stream-video');

// mongoose temp for saving class
var mongoose = require('mongoose');
var classes = require('../models/classes');

var groups = require('../models/groups');
var comments = require('../models/comments');

module.exports = function(app) {

    app.get('/ng', function(req,res) {
        var newGroup = new groups({
            groupName : "Illustrators",
            groupThumbnail : "https://i.pinimg.com/736x/46/39/06/4639060eed251c2cc881e9351e5b75ef--line-illustration-portrait-illustration.jpg",
            memberCount : "0",
            comments : []
        });

        newGroup.save(function(err, group) {
            if(!err) {
                console.log("new group : " + group);
                res.json(group);
            }
        })
    });

    app.get('/ncls', function(req, res) {

        var newClass = new classes({
            title : "SEO Today: Strategies to Earn Trust, Rank High, and Stand Out",
            imageUrl : "https://static.skillshare.com/uploads/video/thumbnails/562151dcbe554d7341678c16c8d07f6c/448-252",
            tutorName : "Rand Fishkin",
            totalDuration : "4140000",
            reviewPercent : "99",
            subscriberCount : "1838",
            lessons : {
                title : "SEO Today: Strategies to Earn Trust, Rank High, and Stand Out",
                totalDuration : "4140000",
                reviewPercent : "99", 
                subscriberCount : "1838",
                tutor : {
                    tutorId : "Rand Fishkin's ID",
                    name : "Rand Fishkin",
                    followers : "11628",
                    imageUrl : "https://static.skillshare.com/uploads/users/4880302/user-image-medium.jpg?854842768"
                },
                videos : [{
                    url : "https://f1.media.brightcove.com/12/3695997568001/3695997568001_5463401859001_5463396146001.mp4?pubId=3695997568001&videoId=5463396146001",
                    title : "Introduction",
                    duration : "137000",
                    thumbnailUrl : "https://static.skillshare.com/uploads/video/thumbnails/562151dcbe554d7341678c16c8d07f6c/651-366",
                    order : "1"
                },
                {
                    url : "https://f1.media.brightcove.com/12/3695997568001/3695997568001_5480247711001_5480233767001.mp4?pubId=3695997568001&videoId=5480233767001",
                    title : "I. Link Earning, Whiteboard",
                    duration : "916000",
                    thumbnailUrl : "",
                    order : "2"
                },
                {
                    url : "https://f1.media.brightcove.com/12/3695997568001/3695997568001_5463277991001_5463244831001.mp4?pubId=3695997568001&videoId=5463244831001",
                    title : "I. Link Earning, Screencast",
                    duration : "356000",
                    thumbnailUrl : "",
                    order : "3"
                },
                {
                    url : "https://f1.media.brightcove.com/12/3695997568001/3695997568001_5485037286001_5485012419001.mp4?pubId=3695997568001&videoId=5485012419001",
                    title : "II. On-Page Optimization, Whiteboard",
                    duration : "820000",
                    thumbnailUrl : "",
                    order : "4"
                },
                {
                    url : "https://f1.media.brightcove.com/12/3695997568001/3695997568001_5463277798001_5463280286001.mp4?pubId=3695997568001&videoId=5463280286001",
                    title : "II. On-Page Optimization, Screencast",
                    duration : "217000",
                    thumbnailUrl : "",
                    order : "5"
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
                        content : "good good very good!!",
                        reviewerId : "temp ID",
                        reviewerName : "Epik High",
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

    app.put('/user/follow/:userId', function(req, res) {
        userFunction.followOrUnfollow(req.params.userId, req.body, function(result) {
            res.json(result);
        });
    });

    app.post('/user/joinGroup', function(req, res) {
        userFunction.joinGroup(req.body, req.query.userId, function(result) {
            res.json(result);
        });
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

    app.get('/group/getComments/:groupId/:position', function(req, res) {
        var groupId = req.params.groupId;
        var position = req.params.position;

        groupFunction.getComments(groupId, position, function(result) {
            res.json(result);
        });
    })

    app.post('/group/sendComment', function(req, res) {
        var groupName = req.query.groupName;
        var comment = req.body;

        groupFunction.sendComment(groupName, comment, function(result) {
            res.json(result);
        });
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

    app.get('/class/search/:content', function(req, res) {
        classFunction.search(req.params.content, function(result) {
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

    app.post('/discussions/like', function(req, res) {
        var userName = req.body.userName;
        var resId = req.body.resId;
        var message = userName + " 님이 회원님의 글을 좋아합니다."

        gcmFunction.sendLikeMessage(message, resId, function(result) {
            console.log(result);
        });

        var discussionId = req.body.discussionId;
        var userId = req.body.userId;
        
        discussionFunction.like(discussionId, userId, function(result) {
            res.json(result);
        });
    })

    app.post('/discussions/unlike', function(req, res) {
        var discussionId = req.body.discussionId;
        var userId = req.body.userId;
        
        discussionFunction.unlike(discussionId, userId, function(result) {
            res.json(result);
        });

        var userName = req.body.userName;
        var resId = req.body.resId;
        var message = userName + " 님이 좋아요를 취소하셨습니다."

        gcmFunction.sendLikeMessage(message, resId, function(result) {
            console.log(result);
        });
    })

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