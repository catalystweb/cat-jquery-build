//this is for deployment to heroku only
var express = require('express');
var serveStatic = require('serve-static')
var server = express();
var port = process.env.PORT || 1488;
server.use(serveStatic('app/', { 'index': ['app.html'] }))
server.listen(port);
console.log("expressjs server working on port " +port);