var express = require('express');
var router = express.Router();
var Restaurant  = require("../models/restaurant");
var middleware = require("../middleware");
var geocoder = require('geocoder');

// =================
// RESTAURANT ROUTES
// =================

// INDEX ROUTE
router.get("/", function(req, res){
    Restaurant.find({}, function(err, allRestaurants){
        if(err){
            console.log(err);
        } else {
            res.render("restaurants/index", {restaurant:allRestaurants, currentUser: req.user});
        }
    });
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name,
        image = req.body.image,
        cost = req.body.cost,
        desc = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        };
    geocoder.geocode(req.body.location, function(err, data){
       var lat = data.results[0].geometry.location.lat;
       var lng = data.results[0].geometry.location.lng;
       var location = data.results[0].formatted_address;
       var newRestaurant = {name: name, image: image, description: desc, cost: cost, author:author, location: location, lat: lat, lng: lng};
       Restaurant.create(newRestaurant, function(err, newlyCreated){
           if(err){
               console.log(err);
           } else {
               req.flash("success", "Restaurant created!");
               res.redirect("/restaurants");
           }
        });
    });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("restaurants/new");
});

// SHOW ROUTE
router.get("/:id", function(req, res){
    Restaurant.findById(req.params.id).populate("reviews").exec(function(err, foundRestaurant){
        if (err) {
            console.log(err);
        } else {
            res.render("restaurants/show", {restaurant: foundRestaurant});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkRestaurantOwnership, function(req, res){
    Restaurant.findById(req.params.id, function(err, foundRestaurant){
        if(err){
            req.flash("error", "DB ERROR: Restaurant not found!");
            res.redirect("back");
        } else {
            res.render("restaurants/edit", {restaurant: foundRestaurant});
        }

    });
});

// UPDATE ROUTE
router.put("/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
    Restaurant.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, restaurant){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/restaurants/" + restaurant._id);
        }
    });
  });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkRestaurantOwnership, function(req, res){
    Restaurant.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/restaurants");
        } else {
            req.flash("success", "Restaurant deleted!");
            res.redirect("/restaurants");
        }
    });
});

module.exports = router;