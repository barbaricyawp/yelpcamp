var express = require('express');
var router = express.Router({mergeParams: true});
var Restaurant  = require("../models/restaurant"),
    User = require("../models/user"),
    Order = require("../models/order");
    
var middleware = require("../middleware");
var moment = require('moment');


// NEW ROUTE
router.get("/new", function(req, res){
    Restaurant.find({}, function(err, allRestaurants){
        if(err){
            console.log(err);
        } else {
            res.render("orders/new", {restaurant:allRestaurants, currentUser: req.user});
        }
    });
});


module.exports = router;