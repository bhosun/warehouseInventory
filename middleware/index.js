var db = require("../models/inventory");

// all middleware goes here
var middlewareObj = {};

middlewareObj.checkInventoryOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		db.findById(req.params.id, function(err, foundInv) {
			if(err) {
				res.redirect("back");
			} else {
				// does user own inv
				if(foundInv.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect("back");
				};
			}
		});
	} else {
		res.redirect("back");
	}
}


// Middleware
middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;