var mongoose = require("mongoose");

var planSchema = new mongoose.Schema({
	planname: String,
	des: String,
	date: String
});

module.exports = mongoose.model('Plan', planSchema);