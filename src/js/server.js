// server.js
const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../app/app.html'));
});

app.listen(process.env.PORT || 5000, function(){
    console.log('Server is running on Port ' +process.env.PORT);
    console.log("----------------------------------");
    console.log("[\x1b[31m v0.5 Catalyst App \x1b[37m] \- \x1b[32mdeveloped by Daniel Kandilas");
    console.log("----------------------------------");
});