var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
        name: "Cloud's Island",
        image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        decription: "This is so cloudy!"
    },
    {
        name: "Lake's View",
        image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "The lake is so so pretty!"
    },
    {
        name: "Firefly's Dream",
        image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "In the dark, you can feel the nature is coming to you!"
    },
    {
        name: "Forest's Tale",
        image: "https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Wait for a fairy tale in the woods, where led to you dream land."
    },
    {
        name: "Rocky's Bed",
        image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "The rock you want to see and sit on top of it!"
    }
];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
        //     if (err) {
        //         console.log(err.message)
        //     }
        //     console.log("removed campgrounds")
        // });
        // // add some campgrounds
        // data.forEach(function(seed) {
        //     Campground.create(seed, function(err, campground) {
        //         if (err) {
        //             console.log(err.message);
        //         } else {
        //             console.log("Added a new campground");
        //             //create a commet
        //             Comment.create({
        //                 text: "This is a great place, you don't want to miss it!",
        //                 author: "Homer Forbes"
        //             }, function(err, comment) {
        //                 if (err) {
        //                     console.log(err.message);
        //                 } else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("added a comment!")
        //                 }
        //             })
        //         }
        //     })
    })
}


// add some comments

module.exports = seedDB;