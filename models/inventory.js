var mongoose = require("mongoose");

// SCHEMA SETUP
var dbInvSchema = new mongoose.Schema({
    item: String,
    storeKeeper: String,
    status: String,
    quantity: String,
    price: String,
});

module.exports = mongoose.model("db", dbInvSchema);