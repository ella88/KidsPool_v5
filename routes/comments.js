var express = require("express");
var router = express.Router({ mergeParams: true }); // merge the parameters in Campground route
const Campground = require("../models/campground")
const Comment = require("../models/comment");
const middleware = require("../middleware");

//======COMMENT ROUTES==========

// NESTED ROUTE, add comment route
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err.message);
        } else {
            res.render("comments/new", { campground: campground });
        }
    })
})

// NESTED ROUTE, Post comments
router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log("Error finding the campground!")
        } else {
            Comment.create(req.body.comment, function(err, newComment) {
                if (err) {
                    req.flash("error", "Sorry, something went wrong!")
                } else {
                    // add username and id to comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    // save comment
                    campground.comments.push(newComment);
                    campground.save(); // save the campground
                    req.flash("success", "Thank you! Comment created!")
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })

});

// Update comment,GET, show updated comment page
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            console.log("ERROR")
        } else {
            res.render("comments/edit", { camp_id: req.params.id, comment: foundComment })
        }
    })
});

// Update comment, put
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            //console.log(foundComment);
            req.flash("success", "Thanks for updating your comments!")
            res.redirect("/campgrounds/" + req.params.id);
        }
    })

});

// Destroy Comment Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, req.body.comment, function(err, deleteComment) {
        if (err) {
            res.redirect("back");
        } else {
            //console.log(deleteComment);
            req.flash("error", "Your comment has been deleted!")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });

});


/******************************************************************************/
/*************************** original middleware functions *********************/
/*
// Login logic, if user wants to post a comment, he/she must first log in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}


// check comment ownership, only owner can delete or update the comment
// comment_id is provided in the router
// NOTE, req.params.id is the id of campground, instead, req.params.comment_id is the id of comment
function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (foundComment.author.id.equals(req.user.id)) {
                next();
            } else {
                res.redirect("back");
            }
        })
    } else {
        res.send("Please first LOG IN!")
    }
};
*/
module.exports = router;