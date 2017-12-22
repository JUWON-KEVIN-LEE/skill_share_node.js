
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8079;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var listen = app.listen(port);

require('./routes/routes')(app);