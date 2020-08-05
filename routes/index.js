var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// ROUTES ===========================

// route, homepage
router.get("/", function(req, res) {
    res.render("landing");
});

//======AUTHENTICATION ROUTES==========

// Register Routes
router.get("/register", function(req, res) {
    res.render("register");
});
// Register Post routes
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        //console.log(user);
        passport.authenticate('local')(req, res, function() {
            req.flash("success", "Welcome to YelpCamp! " + req.body.username.toUpperCase())
            res.redirect("/campgrounds");
        })
    })
});
// LOGIN route, show login form
router.get("/login", function(req, res) {
    res.render("login");
})

// LOGIN POST
router.post("/login", passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {

});

// LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You've successfully logged out!")
    res.redirect("/campgrounds");
});

module.exports = router;