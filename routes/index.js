var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");
var Restaurant  = require("../models/restaurant");

// ROOT ROUTE
router.get("/", function(req, res){
   res.render("landing"); 
});

router.get("/home", function(req, res){
    Restaurant.find({}, function(err, allRestaurants){
        if(err){
            console.log(err);
        } else {
            res.render("home", {restaurant: allRestaurants, restaurantJSON: JSON.stringify(allRestaurants), currentUser: req.user});
        }
    });
});


router.get("/help/faq", function(req, res){
    res.render("help/faq");
});

// ===========
// AUTH ROUTES
// ===========

// SHOW LOGIN ROUTE
router.get("/login", function(req, res){
   res.render("login"); 
});

// POST LOGIN ROUTE
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/home", 
        failureRedirect: "/login"
    }), function(req, res){
});

// GET LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have been logged out!")
    res.redirect("/home");
});

module.exports = router;