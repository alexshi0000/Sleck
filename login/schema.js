var mongoose = require("mongoose");


var userSchema = new mongoose.Schema({
    firstName: String, 
    lastName: String, 
    nickName: String, 
    propic: {data: Buffer, contentType: String}
});

var User = mongoose.model("User", userSchema);

module.exports = User;
