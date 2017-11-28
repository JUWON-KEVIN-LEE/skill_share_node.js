var mongoose = require('mongoose');

// Schema <<< document 구조를 보여준다
var Schema = mongoose.Schema;

// Schema type : String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
var deviceSchema = mongoose.Schema({
    deviceName : String,
    deviceId : String,
    registrationId : String
});

// url / db 이름
mongoose.connect('mongodb://localhost:27017/skill-share-db');

// 'collection name', schema <<< 자동적으로 collection name 을 plural 로 변환해준다 <<< 'devices' 로 저장된다.
module.exports = mongoose.model('device', deviceSchema);