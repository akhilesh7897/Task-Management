var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	usertasks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Task"
	}],
	userteamtasks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "TeamTask"
	}]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);