var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();


var homeitems = [
	{name: "Tasks",	image: "https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&dpr=3&h=400&w=600", link: "tasks"},
	{name: "Team tasks", image: "https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=400&w=600", link: "teamtasks"},
	{name: "Events", image: "https://images.pexels.com/photos/1020323/pexels-photo-1020323.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=400&w=600", link: "events"},
	{name: "News", image: "https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=400&w=600", link: "news"},
]

router.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

router.get("/", function(req, res){
	res.render("../views/home", {homeitems: homeitems});
})

router.get("/register", function(req, res){
	res.render("../views/register");
})

router.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err,user){
		if(err){
			console.log(err);
			return res.render("../views/register");
		}
		passport.authenticate("local")(req, res, function(){
			console.log(user);
			res.redirect("/dashboard");
		});
	});
});

router.get("/login", function(req, res){
	res.render("../views/login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/dashboard",
	failureRedirect: "/login"
	}), function(req, res){
});

router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

router.get("/dashboard", function(req, res){
	res.render("../views/dashboard", {homeitems: homeitems});
})

router.get("/secret", isLoggedIn, function(req, res){
	if(err){
		console.log(err);
	} else
	res.render("../views/secret");
})


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router;