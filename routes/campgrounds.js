var express = require("express");
var router = express.Router();
const Campground = require("../models/campground")
const Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

// route camping sites
// get data from databse
router.get("/", function(req, res) {
    //res.render("campgrounds", { sites: sitesData });
    Campground.find({}, function(err, allcamps) {
        if (err) {
            console.log("OH NO, ERROR OCCURRED!")
            console.log(err);
        } else {
            res.render("campground/index", { sites: allcamps, currUser: req.user })
        }
    })
});

// to post a camp site
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from post
    var name = req.body.name;
    var url = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = { name: name, image: url, description: desc, author: author, price: price };
    // create a new campground and save to database
    Campground.create(newCamp, function(err, newcamp) {
        if (err) {
            console.log(err);
        } else {
            // redirect to the page
            //console.log(newcamp);
            req.flash("success", "Thank you! New Campground Created!")
            res.redirect("/campgrounds")
        }
    })
});

// route of posting website
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campground/new");

});

// show route
router.get("/:id", function(req, res) {
    // find campground by id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
        if (err || !foundCamp) {
            req.flash("error", "Campground not found!");
            res.redirect("/campgrounds");
        } else {
            //console.log(foundCamp);
            res.render("campground/show", { camp: foundCamp })
        }
    })
});

// Campground edit
router.get("/:id/edit", middleware.checkCampOwnership, function(req, res) {
    // check ownership first, if yes, do next function
    Campground.findById(req.params.id, function(err, foundCamp) {
        if (err) {
            res.redirect("back")
        } else {
            res.render("campground/edit", { camp: foundCamp });
        }
    })
});

// Campground update
router.put("/:id", middleware.checkCampOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updateCamp) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successful Updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

// Destroy campground route
router.delete("/:id", middleware.checkCampOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, req.body.camp, function(err, deleteCamp) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds");
        }
    })
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

// ownership logic, middleware function
function checkCampOwnership(req, res, next) {
    // is the user owning the campground?
    // otherwise, redirect
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCamp) {
            if (err) {
                res.redirect("back");
            } else {
                if ((foundCamp.author.id).equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        console.log("Please log in")
        res.send("Please log in!")
    }
}
*/
/******************************************************************************/

module.exports = router;