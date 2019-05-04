var express = require("express");
var router = express.Router


router.get("/events", function(req, res){
	Event.find({}, function(err, allEvents){
		if(err) {
			console.log(err);
		} else{
			res.render("events", {events: allEvents});
		}
	});
});


module.exports = router;