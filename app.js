var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
	mongoose        = require("mongoose"),
	flash 			= require("connect-flash");
    passport        = require("passport"),
	LocalStrategy   = require("passport-local"),
	methodOverride  = require("method-override");
    db              = require("./models/inventory"),
    User            = require("./models/user");

require('dotenv').config()

// Require Routes
var inventoryRoutes = require("./routes/inventory");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "yeah Mann im good to go",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error	   = req.flash("error");
	res.locals.success	   = req.flash("success");
    next();
});

// Landing Page
app.get("/", function(req, res){
    res.render("landing");
});

app.use("/inventory", inventoryRoutes);


app.listen(app.get('port'), function(){
    console.log("DbInventory Server has started");
});