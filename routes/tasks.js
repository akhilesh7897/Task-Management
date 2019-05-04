var express = require("express");
var passport = require("passport");
var Task = require("../models/task");
var router = express.Router();


router.get("/tasks", isLoggedIn, function(req, res){
	Task.find({}, function(err, allTasks){
		if(err) {
			console.log(err);
		} else {
			res.render("../views/tasks/tasks", {tasks: allTasks});
		}
	});
});

router.get("/tasks2", isLoggedIn, function(req, res){
	Task.find({}, function(err, allTasks){
		if(err) {
			console.log(err);
		} else {
			res.render("../views/tasks/tasks2", {tasks: allTasks});
		}
	});
});

router.get("/tasks/new", isLoggedIn, function(req, res){
	res.render("../views/tasks/newtask");
})

router.get("/tasks/:id", isLoggedIn, function(req, res){
	Task.findById(req.params.id, function(err, foundTask){
		if(err){
			console.log(err);
		} else {
			res.render("../views/tasks/showtask", {task: foundTask});
		}
	})
})

router.get("/tasks/:id/edit", isLoggedIn, function(req,res){
	Task.findById(req.params.id, function(err, foundTask){
		if(err){
			console.log(err);
			res.redirect("/");
		} else {
			res.render("../views/tasks/edittask", {task: foundTask});
		}
	});
});


router.post("/tasks", isLoggedIn, function(req, res){
	Task.create(req.body.task, function(err, newlyCreated){
		if(err){
			console.log(err);
			res.redirect("/tasks");
		} else {
			console.log(req.body.task);
			// console.log(currentUser);
			res.redirect("/tasks");
		}
	});
})

router.put("/tasks/:id", isLoggedIn, function(req,res){
	Task.findByIdAndUpdate(req.params.id, req.body.task, {new: true}, function(err, updatedTask){
		console.log(updatedTask);
		if(err){
			console.log(err);
			res.redirect("/tasks");
		} else{
			console.log(updatedTask);
			console.log(req.body.task);
			res.redirect("/tasks");
		}
	});
});

router.delete("/tasks/:id", isLoggedIn, function(req,res){
	Task.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err)
			res.redirect("/tasks");
		} else {
			res.redirect("/tasks");
		}
	});
});


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router;