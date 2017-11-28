var express = require('express');
var router = express.Router();
var passport = require('passport');
var faker = require('faker');
var User = require("../models/user");

// NEW - USER ROUTE 
// /user/new GET
// REGISTRATION FORM LINK
router.get("/new", function(req, res){
    res.render("users/new");
});

// CREATE - USER ROUTE
// /user/ POST
// REGISTRATION FORM BACKEND
router.post("/", function(req, res){
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
            return res.redirect("/users/new");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to 2Dinein, " + user.username + "!");
            res.redirect("/home");
        });
    });
});

// SHOW - USER ROUTE
// /user/:id GET
// USER PROFILE PAGE LINK
router.get("/:id", function(req, res){
    User.findById(req.user._id, function(err, foundUser){
        if(err){
            req.flash("error", "DB ERROR: User not found!");
            res.redirect("back");
        } else {
            res.render("users/show", {user: foundUser});
        }
    });
});


// UPDATE - USER ROUTE
// /user/:id PUT
// USER PROFILE PAGE UPDATE

// DESTROY - USER ROUTE
// /user/:id DELETE

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

module.exports = router;