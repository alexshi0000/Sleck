var express = require("Express");
var app = express();
var port = 3000;
var server = require("http").createServer(app);
var bodyParser = require("body-parser");
var person1 = require("./mongoSchema.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/mongo.html");
});

app.post("/adduser", function(req, res){
    var userOne = new person1(req.body);
    userOne.save().then(function(person) {
        res.sendFile(__dirname + "/mongo.html");
        console.log("user added: " + userOne);
    })
        .catch(err => {
        res.status(400).send("Unable to save to database");
    });
});

app.post("/deluser", function(req, res){ person1.deleteOne().then(function(person) {
        res.sendFile(__dirname + "/mongo.html");
        console.log("user removed: " + userOne);
    })
        .catch(err => {
        res.status(400).send("Unable to delete from database");
    });
});

server.listen(port, () => {
    console.log("Server listening on port " + port);
});
