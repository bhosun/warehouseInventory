var mongoose = require("mongoose");
var db       = require("./models/inventory");

var data = [
    {
        item: "Playstation 4",
        storeKeeper: "Sanya",
        status: "In Stock",
        quantity: 3,
        price: 130,
    },
    {
        item: "Eloquent Javascript Book",
        storeKeeper: "Adamu",
        status: "In Stock",
        quantity: 50,
        price: 10,
    },
    {
        item: "Swimming Trunk for Fat People",
        storeKeeper: "Philip",
        status: "Out of Stock",
        quantity: 0,
        price: 10,
    }
];

function seedDB() {
    db.remove({}, function(err, removed) {
        if(err) {
            console.log(err);
        } else {
            console.log("Removed all Cg");
            // Add some data
            data.forEach(function(seed) {
                db.create(seed, function(err, inv) {
                    if(err) {
                        console.log(err) 
                    } else {
                        console.log("Created new Inventories");
                    }
                })
            });
        }
    });
}

module.exports = seedDB;