var mongoose = require('mongoose');
var users = require('../models/users');
var jwt = require('jsonwebtoken');

exports.signUp = function(email, password, name, callback) {
    
        var newUser = new users({
            email : email,
            password : password,
            name : name,
        });
    
        users.find({email : email}, function(err, user) {
            if(err) {
                callback({
                    result : 'failure',
                    message : "Error occured : " + err
                });
            } else {
                if(user.length != 0) {
                    callback({
                        result : 'failure',
                        message : "Response : Already existed email address"
                    });
                } else {
                    newUser.save(function(err, user) {
                        if(!err) {
                            // user 정보를 이용해서 Token 생성
                            user.token = jwt.sign({email : user.email}, 'secret');

                            user.save(function(err, userWithToken) {
                                console.log("after token user : " + userWithToken);
                                callback({
                                    result : 'success',
                                    message : "Response : Sign up successfully",
                                    data : userWithToken,
                                    token : userWithToken.token
                                });
                            })
                        } else {
                            callback({
                                result : 'failure',
                                message : 'Error occured : ' + err
                            });
                        }
                    });
                }
            }
        });
}

exports.getMyInfo = function(token, callback) {
    users.findOne({token : token}, function(err, user) {
        if(err) {
            callback({
                result : 'failure',
                message : 'Error occured : ' + err
            });
        } else {
            callback({
                result : 'success',
                data : user
            })
        }
    });
}

exports.signIn = function(email, password, callback) {
    users.findOne({email : email, password : password}, function(err, user) {
        if(user.length != 0) {
            console.log("Sign In"+user);
            callback({
                result : 'success',
                message : 'response : sign-in succeeded',
                data : user,
                token : user.token
            });
        } else {
            callback({
                result : 'failure',
                message : 'response : no account message'
            });
        }
    });
}

exports.getUser = function(userId, callback) {
    users.findById(userId, function(err, user) {
        callback(user);
    });
};

exports.followOrUnfollow = function(userId, tutor, callback) {
    users.findById(userId, function(err, user) {
        var index = -1;

        for(var i=0; i<user.following.length; i++) {
            if(user.following[i].userId == tutor.tutorId) {
                index = i;
                break;
            }
        }
        
        if(index >= 0) {
            var following = user.following[index];
            user.following.splice(index,1);

            user.save(function(err) {
                if(!err) {
                    callback(following)
                } else {
                    callback(null)
                }
            })
        } else {
            user.following.push({
                userId : tutor.tutorId,
                name : tutor.name,
                imageUrl : tutor.imageUrl
            });

            user.save(function(err, user) {
                if(!err) {
                    callback(user.following[user.following.length-1])
                } else {
                    callback(null)
                }
            });
        }
    });
}

exports.followSkills = function(userId, skills, callback) {
    users.findById(userId, function(err, user) {
        user.followingSkills = skills;

        user.save(function(err, user) {
            if(!err) {
                console.log("user follow skill save");
                callback({
                    result : "success"
                })
            } else {
                callback({
                    result : "failure"
                })
            }
        });
    });
}

exports.joinGroup = function(group, userId, callback) {
    users.findById(userId, function(err, user) {
        user.groups.push({
            groupId : group._id,
            groupName : group.groupName,
            groupThumbnail : group.groupThumbnail,
            memberCount : group.memberCount
        });

        user.save(function(err) {
            if(!err) {
                console.log("success");
                callback({
                    result : 'success',
                    message : 'response : join group succeeded',
                })
            } else {
                callback({
                    result : 'failure',
                    message : 'response : join group failed',
                })
            }
        })
    })
}

exports.setNickname = function(userId, nickname, callback) {
    users.findById(userId, function(err, user) {
        user.nickname = nickname;

        user.save(function(err) {
            if(!err) {
                callback({
                    result : 'success',
                    message : 'server response : set nickname succeeded',
                })
            } else {
                callback({
                    result : 'failure',
                    message : 'server response : set nickname failed',
                })
            }
        });
    });
}

exports.setImageUrl = function(userId, path, callback) {
    users.findById(userId, function(err, user) {
        user.imageUrl = path;

        user.save(function(err) {
            if(!err) {
                callback({
                    result : 'success',
                    message : 'server response : set image url succeeded',
                })
            } else {
                callback({
                    result : 'failure',
                    message : 'server response : set image url failed',
                })
            }
        });
    });
}

var classes = require('../models/classes');

exports.subscribeClass = function(userId, classId, callback) {
    classes.findById("5a4f1afc83004e24a841ce16", {_id: 1, imageUrl : 1, title : 1, tutorName:1, totalDuration : 1, reviewPercent : 1, subscriberCount : 1}
        , function(err, classData) {
        if(!err) {
            users.findById(userId, function(err, user) {
                
                user.subscribedClasses.push({
                    classId : classData._id,
                    imageUrl : classData.imageUrl,
                    title : classData.title,
                    tutorName : classData.tutorName,
                    totalDuration : classData.totalDuration,
                    reviewPercent : classData.lessons.reviewPercent,
                    subscriberCount : classData.lessons.subscriberCount
                });

                user.save(function(err) {
                    if(!err) {
                        callback({
                            result : "success",
                            data : user.subscribedClasses[user.subscribedClasses.length-1]
                        });
                    } else {
                        callback({
                            result : "failure",
                            message : err
                        });
                    }
                });
            })
        }
    });
}

exports.unsubscribeClass = function(userId, classId, callback) {
    classes.findById("5a4f1afc83004e24a841ce16", {_id: 1, imageUrl : 1, title : 1, tutorName:1, totalDuration : 1, reviewPercent : 1, subscriberCount : 1}
        , function(err, classData) {
        if(!err) {
            users.findById(userId, function(err, user) {

                var subscribedClass = {
                    classId : classData._id,
                    imageUrl : classData.imageUrl,
                    title : classData.title,
                    tutorName : classData.tutorName,
                    totalDuration : classData.totalDuration,
                    reviewPercent : classData.lessons.reviewPercent,
                    subscriberCount : classData.lessons.subscriberCount
                }

                var index = user.subscribedClasses.indexOf(subscribedClass);
                user.subscribedClasses.splice(index,1);

                user.save(function(err) {
                    if(!err) {
                        callback({
                            result : "success",
                            data : subscribedClass
                        });
                    } else {
                        callback({
                            result : "failure",
                            message : err
                        });
                    }
                });
            })
        }
    });
}