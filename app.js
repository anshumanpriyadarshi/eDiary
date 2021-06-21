let express               = require('express');
let app                   = express();
let passport              = require("passport");
let LocalStrategy         = require("passport-local");
let bodyParser            = require("body-parser");
let mongoose              = require("mongoose");
let Campgrounds           = require("./models/campgrounds");
let Comment               = require("./models/comment");
let User                  = require("./models/user")
let seedDB                = require("./seed");
let PassportLocalMongoose = require("passport-local-mongoose");
let methodOverride        = require("method-override");

let commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/yelpcamp', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
//Set view engine
app.set("view engine", "ejs");
//use body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// SEED The Database
//   seedDB(); 

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to pass currentUser to every single route
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})
//Requiring routes
app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(3000,()=>{
    console.log("Started!!!");
});