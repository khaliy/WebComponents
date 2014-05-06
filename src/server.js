var host = "localhost";
var port = 9999;
var express = require("express");

var app = express();
app.use(express.static(__dirname));

app.listen(port, host);
console.log('simple server listens at ' + host + ':' + port);