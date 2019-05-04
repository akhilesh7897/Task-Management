var express = require("express");
var passport = require("passport");
var Newsitem = require("../models/newsitem");
var router = express.Router();


router.get("/news", isLoggedIn, function(req, res){
	Newsitem.find({}, function(err, allNewsItems){
		if(err) {
			console.log(err);
		} else{
			res.render("../views/news/news", {news: allNewsItems});
		}
	});
});

router.get("/news/new", isLoggedIn, function(req, res){
	res.render("../views/news/newnews");
})

router.get("/news/:id", isLoggedIn, function(req, res){
	Newsitem.findById(req.params.id, function(err, foundNewsitem){
		if(err){
			console.log(err);
			res.redirect("/");

		} else{
			res.render("../views/tasks/shownews", {newsitem: foundNewsitem});
		}
	})
})

router.post("/news", isLoggedIn, function(req, res){
	Newsitem.create(req.body.newsitem, function(err, newsitem){
		if(err){
			console.log(err);
			res.redirect("/news")
		} else {
			newsitem.author.id = req.user._id;
			newsitem.author.username = req.user.username;
			newsitem.save();
			console.log(req.user.username);
			console.log(newsitem);
			res.redirect("/news");
		}
	});
})

router.get("/news/:id/edit", checkOwnership, function(req,res){
	Newsitem.findById(req.params.id, function(err, foundNewsitem){
		if(err){
			console.log(err);
			res.redirect("/");
		} else{
			res.render("../views/news/editnews", {newsitem: foundNewsitem});
		}
	});
});

router.put("/news/:id", checkOwnership, function(req,res){
	Newsitem.findByIdAndUpdate(req.params.id, req.body.newsitem, {new: true}, function(err, updatedNewsitem){
		console.log(updatedNewsitem);
		if(err){
			console.log(err);
			res.redirect("/news");
		} else{
			console.log(updatedNewsitem);
			console.log(req.body.newsitem);
			res.redirect("/news");
		}
	});
});

router.delete("/news/:id", checkOwnership, function(req,res){
	Newsitem.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err)
			res.redirect("/news");
		} else{
			res.redirect("/news");
		}
	});
});


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function checkOwnership(req, res, next){
	if(req.isAuthenticated()){
		Newsitem.findById(req.params.id, function(err, foundNews){
			if(err){
				res.redirect("/news");
			} else {
				if(foundNewsitem.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("/news")
				}
			}
		})
	}
}


module.exports = router;