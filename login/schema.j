var express = require("Express");
var app = express();
var port = 3000;
var server = require("http").createServer(app)
var User = require("./schema.js");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/html/index.html");
});

server.listen(port, () => {
    console.log("listening on " + port)
});
