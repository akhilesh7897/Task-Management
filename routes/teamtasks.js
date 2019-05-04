var express = require("express");
var passport = require("passport");
var TeamTask = require("../models/teamtask");
var Comment = require("../models/comment");
var router = express.Router();


router.get("/teamtasks", isLoggedIn, function(req, res){
	TeamTask.find({}, function(err, allTeamtasks){
		if(err) {
			console.log(err);
		} else {
			res.render("../views/teamtasks/teamtasks", {teamtasks: allTeamtasks});
		}
	})
});

router.get("/teamtasks/new", isLoggedIn, function(req, res){
	res.render("../views/teamtasks/newteamtask");
})

router.get("/teamtasks/:id", isLoggedIn, function(req, res){
	TeamTask.findById(req.params.id).populate("comments").exec(function(err, foundTask){
		if(err){
			console.log(err);
		} else {
			res.render("../views/teamtasks/showteamtask", {teamtask: foundTask});
		}
	})
})

router.get("/teamtasks/:id/edit", isLoggedIn, function(req, res){
	TeamTask.findById(req.params.id, function(err, foundTask){
		if(err){
			console.log(err);
			res.redirect("/");
		} else {
			res.render("../views/teamtasks/editteamtask", {teamtask: foundTask});
		}
	})
});

router.post("/teamtasks", isLoggedIn, function(req, res){
	TeamTask.create(req.body.teamtask, function(err, newlyCreated){
		if(err){
			console.log(err);
			res.redirect("/teamtasks");
		} else {
			newlyCreated.author.username = req.user.username;
			console.log(newlyCreated);
			console.log(req.user.username);
			newlyCreated.save();
			res.redirect("/teamtasks");
		}
	})
})

router.put("/teamtasks/:id", isLoggedIn, function(req, res){
	TeamTask.findByIdAndUpdate(req.params.id, req.body.teamtask, function(err, updatedTask){
		if(err){
			console.log(err);
			res.redirect("/teamtasks");
		} else {
			console.log(updatedTask);
			res.redirect("/teamtasks");
		}
	})
});

router.delete("/teamtasks/:id", isLoggedIn, function(req,res){
	TeamTask.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err)
			res.redirect("/teamtasks");
		} else {
			res.redirect("/teamtasks");
		}
	});
});


router.get("/teamtasks/:id/comments/new", isLoggedIn, function(req, res){
	TeamTask.findById(req.params.id, function(err, foundTask){
		if(err){
			console.log(err);
		} else{
			res.render("../views/teamtasks/comment", {teamtask: foundTask});
		}
	})
})

router.post("/teamtasks/:id/comments", isLoggedIn, function(req, res){
	TeamTask.findById(req.params.id, function(err, foundTask){
		if(err){
			console.log(err);
			res.redirect("/teamtasks");
		} else{
			console.log(req.body.comment);
			Comment.create(req.body.comment, function(err, newlyCreated){
				if(err){
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					teamtask.comments.push(comment);
					console.log(comment);
					teamtask.save();
					res.redirect("/teamtasks");
				}
			})
		}
	})
})


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router;