const express = require("express");
let router = express.Router();
let passport    = require("passport");
let User   = require("../models/user");

// Landing page Route
router.get("/",(req,res)=>{
    res.render("landing");
});

// ==========
//AUTH Routes
// ==========
router.get("/register",(req,res)=>{
    res.render("register");
});

//handle signup
router.post("/register",(req,res)=>{
    let newUser = new User({username: req.body.username});
    User.register(new User(newUser),req.body.password,(err,user)=>{
       if(err){
        console.log(err);
        return res.render("register");
       } 
       passport.authenticate("local")(req,res,()=>{
           res.redirect("/campgrounds");
       });
    });
});

// show login form
router.get("/login",(req,res)=>{
    res.render("login");
});

// handle login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }),(req,res)=>{
    
});
//logiut route
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;