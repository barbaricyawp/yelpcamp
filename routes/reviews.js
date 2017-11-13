var express = require('express');
var router = express.Router({mergeParams: true});
var Restaurant  = require("../models/restaurant"),
    Review     = require("../models/review");
    
var middleware = require("../middleware");

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err) {
            console.log(err);
        } else {
            res.render("reviews/new", {restaurant:restaurant});
        }
    });
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
            res.redirect("/restaurants");
        } else {
            Review.create(req.body.review, function(err, review){
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to review
                    review.author.id = req.user._id;
                    review.author.username = req.user.username;
                    // save review
                    review.save();
                    restaurant.reviews.push(review);
                    restaurant.save();
                    req.flash("success", "Review created!");
                    res.redirect("/restaurants/" + restaurant._id);
                }
            });
        }
    });
});

// EDIT ROUTE
router.get("/:review_id/edit", middleware.checkReviewOwnership, function(req, res){
    Review.findById(req.params.review_id, function(err, foundReview){
        if(err){
            res.redirect("back");
        } else {
            res.render("reviews/edit", {restaurant_id: req.params.id, review: foundReview});
        }
    });
});

// UPDATE ROUTE
router.put("/:review_id", middleware.checkReviewOwnership, function(req, res){
   Review.findByIdAndUpdate(req.params.review_id, req.body.review, function(err, updatedReview){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/restaurants/" + req.params.id);
       }
   });
});

// DELETE ROUTE
router.delete("/:review_id", middleware.checkReviewOwnership, function(req, res){
    Review.findByIdAndRemove(req.params.review_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Review deleted!");
            res.redirect("/restaurants/" + req.params.id);
        }
    });
});

module.exports = router;