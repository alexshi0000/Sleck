//using Socket/io to communicate through local hosts

//Express initiation
var express = require("express");
var app = express();
var server = app.listen(3000);

//Socket initiation
var socket = require("socket.io");
var io = socket(server);

//get the HTML file.webstie
app.get("/", function(req, res){
    res.sendFile(__dirname + "/Slecktest.html");
});

io.on('connection', function(socket){
    console.log("connected");
    socket.on('disconnect', function(){
        console.log("disconnect");
    });
    socket.on("chat message", function(msg){
        io.emit("chat message",msg);
    });
});
