var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession = require("express-session");

var app = express();

var User = require("./models/user"),
    Comment = require("./models/comment"),
	Task = require("./models/task"),
	TeamTask = require("./models/teamtask"),
	Newsitem = require("./models/newsitem"),
	Event = require("./models/event");

mongoose.connect('mongodb://localhost/collab', function(err){
	if(err) throw err;
	console.log("MongoDB successfully connected using Mongoose");
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(expressSession({
	secret:"Secret line", 
	resave: false, 
	saveUninitialized: false
	}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

var indexRoutes = require("./routes/index"),
	taskRoutes = require("./routes/tasks"),
    newsRoutes = require("./routes/news"),
    teamtaskRoutes = require("./routes/teamtasks"),
    eventRoutes = require("./routes/events");
    // planRoutes = require("./routes/plans"),

app.use(taskRoutes);
app.use(teamtaskRoutes);
app.use(indexRoutes);
app.use(newsRoutes);
app.use(eventRoutes);


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


// ======================================================================
// ROUTES
// ======================================================================

// ======================================================================
// SERVER
// ======================================================================


app.listen(3000, function(){
	console.log("Server started");
})