var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



// Landing Page
router.get("/", function(req, res){
    res.render("landing");
});


// AUTH ROUTES

// Register Routes
// get form
router.get("/register", function(req, res) {
    res.render("register");
});

// POST FORM
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
			req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
			req.flash("success", "Welcome " + user.username);
            res.redirect("/inventory");
        });
    });
});

// LOGIN ROUTES
// login form
router.get("/login", function(req, res) {
    res.render("login");
});
// post Login
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/inventory",
        failureRedirect: "/login"
    }), function(req, res) {
});

// Logout Route
router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "Logged You Out!!");
    res.redirect("/inventory");
});

module.exports = router;