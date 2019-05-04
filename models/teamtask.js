var mongoose = require("mongoose");
var User = require("./user");
var Comment = require("./comment");


var teamtaskSchema = new mongoose.Schema({
	taskname: String,
	des: String,
	deadline: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	members: [{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});
// var ArchivedTeamTask = mongoose.model('ArchivedTask', taskSchema);


module.exports = mongoose.model('TeamTask', teamtaskSchema);


