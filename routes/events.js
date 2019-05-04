var express = require("express");
var passport = require("passport");
var Event = require("../models/event");
var router = express.Router();


router.get("/events", isLoggedIn, function(req, res){
	Event.find({}, function(err, allEvents){
		if(err) {
			console.log(err);
		} else{
			res.render("../views/events/events", {events: allEvents});
		}
	});
});

router.get("/events/new", isLoggedIn, function(req, res){
	res.render("../views/events/newevent");
})

router.get("/events/:id", isLoggedIn, function(req, res){
	Event.findById(req.params.id, function(err, foundEvent){
		if(err){
			console.log(err);
		} else{
			res.render("../views/events/showevent", {event: foundEvent});
		}
	})
})

router.post("/events", isLoggedIn, function(req, res){
	Event.create(req.body.eventname, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			console.log(newlyCreated);
			res.redirect("/events");
		}
	});
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router;