var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require('method-override'),
    flash           = require('connect-flash'),
    
    // MODELS
    Restaurant  = require("./models/restaurant"),
    Review     = require("./models/review"),
    User        = require("./models/user"),
    
    // ROUTES
    reviewRoutes        = require("./routes/reviews"),
    restaurantRoutes    = require("./routes/restaurants"),
    adminRoutes         = require("./routes/admin"),
    indexRoutes         = require("./routes/index");

// DB CONFIG    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/restaurant_project", {useMongoClient: true});

// MISC
app.use(bodyParser.urlencoded({extended: true}));    
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "Leia is the best and cutest kitty in the world!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.locals.moment = require('moment');

// ROUTE CONFIG
app.use("/", indexRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/restaurants/:id/reviews", reviewRoutes);
app.use("/admin", adminRoutes);

// RUN SERVER
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has Started...");
});

