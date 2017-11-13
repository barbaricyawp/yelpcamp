var Restaurant = require("../models/restaurant");
var Review = require("../models/review");
var middlewareObj = {};

middlewareObj.checkRestaurantOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Restaurant.findById(req.params.id, function(err, foundRestaurant){
            if(err){
                req.flash("error", "DB ERROR: Restaurant not found!");
                res.redirect("back");
            } else {
                if (foundRestaurant.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkReviewOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Review.findById(req.params.review_id, function(err, foundReview){
            if(err){
                req.flash("error", "DB ERROR: Review not found!");
                res.redirect("back");
            } else {
                if (foundReview.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that!");
    res.redirect("/login");
};


module.exports = middlewareObj;