// express
var express = require('express');
var app = express();

// port
var port = 8079;

// body parser
var bodyParser = require('body-parser');

// socket.io for real time data... 쓸 수 있는 곳이 있을까
// var io = require('socket.io');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var listen = app.listen(port);
// var socket = io.listen(listen);

require('./routes/routes')(app);