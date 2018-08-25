//using Socket/io to communicate through local hosts

//Express initiation
var express = require("Express");
var app = express();
var server = app.listen(3000);

//Socket initiation
var socket = require("socket.io");
var io = socket(server);

//get the HTML file.webstie
app.get("/socket", function(req, res){
    res.sendFile(__dirname + "/Slecktest.html");
});

//turn on and connect/check for connecetion to localhost
io.on('connection', function(socket){
    console.log("connected");
    
    //check for dicconnection
    socket.on('disconnect', function(){
        console.log("disconnect");
    });
    
    //check for chat message and send the user input msg to everyone
    socket.on("chat message", function(msg){
        //send to eveyone, can be specified to who
        io.emit("chat message",msg);
    });
});
