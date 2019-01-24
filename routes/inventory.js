var express = require("express");
var router = express.Router();
var db = require("../models/inventory");
var middleware = require("../middleware/index");

//  INVENTORY ROUTES

// Index Route
router.get("/", function(req, res){
    db.find({}, function(err, allInventory) {
        if(err) {
            console.log(err);
        } else {
            res.render("inventory/index", {inventory: allInventory});
        }
    });
});

// post route
router.post("/", middleware.isLoggedIn, function(req, res){
    var item = req.body.item;
    var storeKeeper = req.body.storeKeeper;
    var status = req.body.status;
    var quantity = req.body.quantity;
    var price = req.body.price;
    var newData = {item: item, storeKeeper: storeKeeper, status: status, quantity: quantity, price: price};
    db.create(newData, function(err, newgee) {
        if(err) {
			req.flash("error", err.message);
            console.log(err);
        } else {
			req.flash("success", "Succesfully Added!!")
            res.redirect("/inventory");
        }
    })
});

// New Route
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("inventory/new");
});

// Show Route
router.get("/:id", function(req, res){
    db.findById(req.params.id, function(err, foundInv) {
        if(err) {
            console.log(err);
        } else {
            res.render("inventory/show", {stuff: foundInv});
            console.log(foundInv);
        }
    })
});

// Edit Route
router.get("/:id/edit", function(req, res) {
	db.findById(req.params.id, function(err, foundInvo) {
			res.render("inventory/edit", {inventory: foundInvo});
	});
  });

// Update Route
router.put("/:id", function(req, res) {
	db.findByIdAndUpdate(req.params.id, req.body.inventory, function(err, updated) {
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/inventory/" + req.params.id);
		}
	})
})


// Destroy Route
router.delete("/:id", function(req, res) {
	db.findByIdAndRemove(req.params.id, function(err, remrem) {
		if(err) {
			res.redirect("/inventory");
		} else {
			res.redirect("/inventory");
		}
	});
});


module.exports = router;