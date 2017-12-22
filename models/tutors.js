var mongoose = require('mongoose');
var Schema = mongoose.Schema;

tutorSchema = new Schema({
    // TODO 채우기
    name : String,
    followers : String,
    imageUrl : String
});


module.exports = mongoose.model('tutor', tutorSchema);