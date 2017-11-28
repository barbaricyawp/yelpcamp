var express = require('express');
var router = express.Router();
var passport = require('passport');
var faker = require('faker');
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


// TEST USER ROUTE
router.post("/testuser", function(req, res){
    var randomusername = faker.internet.email(),
        randomfirstName = faker.name.firstName(),
        randomlastName = faker.name.lastName(),
        randomphoneNumber = faker.phone.phoneNumber(),
        randomPassword = faker.internet.password();
    var newUser = new User(
        {
            username: randomusername,
            firstName: randomfirstName,
            lastName: randomlastName,
            phoneNumber: randomphoneNumber,
        }
    );
    User.register(newUser, randomPassword, function(err, user){
        if(err) {
            req.flash("error", "Error: " + err.message + "!");
            return res.redirect("back");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Test user " + user.username + " created!");
            res.redirect("back");
        });
    });
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
    var newUser = new User(
        {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
        }
    );
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