
var mongoose = require('mongoose');
var classes = require('../models/class');
var lessons = require('../models/lessons');
var about = require('../models/about');
var discussions = require('../models/discussions');

exports.saveClass = function(callback) {
    
}
var newClass = new classes({
    title : "Going Freelance: Building and Branding Your Own Success",
    imageUrl : "https://static.skillshare.com/uploads/video/thumbnails/00da9ecbdcff6b3720dcc633f4ab0e22/448-252",
    tutorName : "Justin Gignac",
    totalDuration : "3060000",
    lessons : {
        reviewPercent : "99", 
        subscriberCount : "267",
        tutor : {
            name : "Justin Gignac",
            followers : "2359",
            imageUrl : "https://graph.facebook.com/840760701/picture?type=normal"
        },
        videos : [{
            title : "Let's Go!",
            duration : "116000",
            thumbnailUrl : "http://s3.amazonaws.com/skillshare/uploads/parentClasses/2f4f5efd1d503e7131249c94cf2ed7bc/681a4bd7",
            order : "0"
        },
        {
            title : "Your Mission: Why You're Here",
            duration : "191000",
            thumbnailUrl : "https://static.skillshare.com/uploads/project/95045c8c57d1227a6cfb442bd5d3661d/219967c6",
            order : "1"
        },
        {
            title : "The Power of Side Projects",
            duration : "510000",
            thumbnailUrl : "https://static.skillshare.com/uploads/project/d00cdd4401224eb969fc135174b89135/b6adbd89",
            order : "2"
        },
        {
            title : "Things All Great Portfolios Do",
            duration : "339000",
            thumbnailUrl : "https://static.skillshare.com/uploads/project/91698/cover_800_28f0ed9b189297e1a13c6bc6cb444eca.jpg",
            order : "3"
        }]
    },
    about : {
            projects : [{
                imageUrl : "https://static.skillshare.com/uploads/project/d00cdd4401224eb969fc135174b89135/3bbd9b77"
            }],
            reviews : [{
                likeOrNot : "like",
                content : "This is first reviews",
                reviewerName : "Great Healthy",
                imageUrl : "https://static.skillshare.com/uploads/project/61144/cover_800_e10d97be1e6045c496651c90efd59572.jpg"
            }],
            subscribers : [{
                name : "James",
                imageUrl : "http://img2.sbs.co.kr/img/sbs_cms/CH/2016/06/06/CH92438362_w300_h300.jpg"
            },
            {
                name : "ChicChoc",
                imageUrl : "http://img2.sbs.co.kr/img/sbs_cms/CH/2016/06/06/CH82423479_w300_h300.jpg"
            },
            {
                name : "Butter Waffle",
                imageUrl : "https://i.ytimg.com/vi/eqEcRwmV2vU/maxresdefault.jpg"
            },
            {
                name : "Computer",
                imageUrl : "http://blogimg.ohmynews.com/attach/26495/1372921881.jpg"
            },
            {
                name : "Apple",
                imageUrl : "http://cfile23.uf.tistory.com/image/9907AF3359C0C1153C71D2"
            }],
            relatedClasses : [{
                thumbnailUrl : "https://cdn-images-1.medium.com/max/2000/1*7pjzaWKedACc3-olWUghLg.png",
                title : "iOS Design I: Getting Started with UX",
                tutorName : "Kara Hodecker"
            }, {
                thumbnailUrl : "https://learn.canva.com/wp-content/uploads/2015/10/40-People-Through-History-Who-Changed-Design-For-Good-04.png",
                title : "Getting Started with Sketch: Design a Beautiful App",
                tutorName : "Christian Krammer"
            }, {
                thumbnailUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIeQXRYXiQyOD3f_Kbw3lvlvo92XMcMImEJrqcwKq1JliJQkfj",
                title : "Mobile App Prototyping",
                tutorName : "Noah Levin"
            }]
    },
    discussions : 
    [{
        name : "Jonathan",
        imageUrl : "http://pds.joins.com/news/component/htmlphoto_mmdata/201706/05/65f78b68-89f2-4add-8ff8-8c2b1b25be53.jpg",
        content : "앱을 만들 때 가장 중요하다고 생각하시는 부분이 어느 부분인가요? 테스트 해보고 싶은 부분이 있군요. 다섯줄을 넘겨야만 합니다. " +
                "어디까지 써야 다섯줄을 넘길 수 있을까요? 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. " +
                "무궁화 삼천리 화려가앙산 대한사람 대한으로 길이 보전하세. 남산 위에 저 소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세",
        time : "1513200000019",
        likeCount : "0",
        userId : "userId1",
        replies : []
    },
    {
        name : "Coach",
        imageUrl : "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory&fname=http%3A%2F%2Fcfile21.uf.tistory.com%2Fimage%2F216FB64E5639CB96315B1B",
        content : "도대체 앱 디자인은 어떻게 하는거죠?",
        time : "1513300600019",
        likeCount : "1",
        userId : "userId2",
        replies : []
    },
    {
        name : "Jane",
        imageUrl : "https://pbs.twimg.com/profile_images/908706663519051776/84pGO2Zl.jpg",
        content : "Hello guys. Pleased to meet you.",
        time : "1513303600019",
        likeCount : "2",
        userId : "userId3",
        replies : [
            {
                name : "Maeil Bio",
                imageUrl : "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory&fname=http%3A%2F%2Fcfile21.uf.tistory.com%2Fimage%2F216FB64E5639CB96315B1B",
                content : "Actually this is test comment.",
                time : "1513306600019"
            },
            {
                name : "kevin Lee",
                imageUrl : "http://image.chosun.com/sitedata/image/201508/06/2015080603367_0.jpg",
                content : "hello!!",
                time : "1513309600019"
            }
        ]
    }]
});
console.log("here outside");
newClass.save(function(err, cls) {
    if(err) {
        console.log(err);
        console.log("error");
    } else {
        console.log(cls);
        console.log("class");
    }
});
console.log("here outside2");