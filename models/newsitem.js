var mongoose = require("mongoose");

var newsitemSchema = new mongoose.Schema({
	title: String,
	content: String,
	date: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

module.exports = mongoose.model('Newsitem', newsitemSchema);