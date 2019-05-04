var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
	name: String,
	des: String,
	venue: String,
	date: String
});

module.exports = mongoose.model('Event', eventSchema);