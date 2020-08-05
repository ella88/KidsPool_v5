// All middleware functions go here!
var Comment = require("../models/comment.js");
var Campground = require("../models/campground.js");
const e = require("express");
var middlewareObj = {};
// checkCampgroundOwnership
middlewareObj.checkCampOwnership = function(req, res, next) {
    // is the user owning the campground?
    // otherwise, redirect
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCamp) {
            if (err || !foundCamp) {
                req.flash("error", "Error! Campground not found!")
                res.redirect("back");
            } else {
                if ((foundCamp.author.id).equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You are not authorized to do that!")
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that!")
        res.redirect("back")
    }
};

//checkCommentOwnership
middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err || !foundComment) {
                req.flash("error", "Comment not found!");
                res.redirect("back");

            } else {
                if (foundComment.author.id.equals(req.user.id)) {
                    next();
                } else {
                    req.flash("error", "You are not authorized to do that!")
                    res.redirect("back");
                }
            }
        })
    }
};

// check whether is isLoggedIn
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!")
    res.redirect("/login")
};

module.exports = middlewareObj;