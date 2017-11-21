var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");
var Restaurant = require("../models/restaurant");
var middleware = require("../middleware");

router.get("/", function(req, res){
    res.render("admin/index");
});

router.get("/userlist", function(req, res){
    User.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            res.render("admin/user_list", {user: allUsers});
        }
    });
});

router.get("/restaurantlist", function(req, res){
    Restaurant.find({}, function(err, allRestaurants){
        if(err){
            console.log(err);
        } else {
            res.render("admin/restaurant_list", {user: allRestaurants});
        }
    });
});

module.exports = router;