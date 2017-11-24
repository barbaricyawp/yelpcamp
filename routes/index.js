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
            res.render("home", {restaurant:allRestaurants, currentUser: req.user});
        }
    });
});

router.get("/help/faq", function(req, res){
    res.render("help/faq");
});


// ===========
// AUTH ROUTES
// ===========

// SHOW REGISTER ROUTE
router.get("/register", function(req, res){
    res.render("register");
});

// POST REGISTER ROUTE
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, permissions: 0});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", "Error: " + err.message + "!");
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to 2Dinein, " + user.username + "!");
            res.redirect("/restaurants");
        });
    });
});

// SHOW LOGIN ROUTE
router.get("/login", function(req, res){
   res.render("login"); 
});

// POST LOGIN ROUTE
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/restaurants", 
        failureRedirect: "/login"
    }), function(req, res){
});

// GET LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have been logged out!")
    res.redirect("/restaurants");
});

module.exports = router;