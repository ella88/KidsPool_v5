var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var MethodOveride = require("method-override");
var flash = require("connect-flash");

var seedDB = require("./seed");
var User = require("./models/user");
const Campground = require("./models/campground");
const Comment = require("./models/comment")

// require routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

// connect to mongo database
mongoose.connect('mongodb://localhost:27017/yelp_camp_v5', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

// parse body
app.use(bodyParser.urlencoded({ extended: true }));
// set view file type
app.set("view engine", "ejs");
// static file
app.use(express.static(__dirname + "/public"));

app.use(MethodOveride("_method"));

app.use(flash());


//seedDB(); // feed database with some data


// PASSPORT CONFIG, this is for flash config
app.use(require("express-session")({
    secret: "Once upon a time, there is a princess living in a castle!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//************************************************************************ */
// add a middleware function for authenticating the user login or not
// this piece of code must be added just before routes, after everything setting up
// this function will be called in every routes
app.use(function(req, res, next) {
    res.locals.currUser = req.user; // pass currUser globally
    res.locals.error = req.flash("error"); // pass mesage globally
    res.locals.success = req.flash("success");
    next();
});
/************************************************************************ */

// use the routes!
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes); // route start with "/campgrounds/:id/comments"
app.use("/campgrounds", campgroundRoutes);
/************************************************************************ */

app.listen(3000, function() {
    console.log("Server has started!")
})