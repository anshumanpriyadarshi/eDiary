const express = require("express");
let router = express.Router();
let Campgrounds = require("../models/campgrounds");
let middleware = require("../middleware/index"); // also ("/middleware")


// Index Route
router.get("/",(req,res)=>{
    console.log(req.user);
    //Get all data from database
    Campgrounds.find({},(err,allcampgrounds)=>{
        if(err){
            console.log(err);
        }
        else{
            // console.log("The Campgrounds are...");
            // console.log(allcampgrounds);
            res.render("campgrounds/index",{campgrounds: allcampgrounds});
        }
    })
});

// Route to form for adding new campgrounds
router.get("/new", middleware.isLoggedin,(req,res)=>{
    res.render("campgrounds/new.ejs");
});

//Show route
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campgrounds.findById(req.params.id).populate("comment").exec((err, foundCampground)=>{
        if(err){
            console.log(err);
        } else {
            //console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

//Edit Campground 
router.get("/:id/edit", middleware.checkCampgroundOwnership,(req,res)=>{
        Campgrounds.findById(req.params.id,(err,foundCampground)=>{
            res.render("campgrounds/edit",{campground: foundCampground});
     });
});        
                
  
//Update Campground
router.put("/:id", middleware.checkCampgroundOwnership,(req,res)=>{
    Campgrounds.findByIdAndUpdate(req.params.id,req.body.campground,(err,campground)=>{
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership,(req,res)=>{
   Campgrounds.findByIdAndDelete(req.params.id,(err)=>{
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
   });
});


// CREATE Route Post route for adding new camgrounds
router.post("/", middleware.isLoggedin,(req,res)=>{
    //get name and image
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id : req.user._id,
        username : req.user.username
    };

    let newCampground = {
        name: name,
        image: image,
        desc :desc,
        author:author
    };
    //push into database
    Campgrounds.create(newCampground,(err,campground)=>{
        if(err){
            console.log("Something went wrong")
        }
        else{
            console.log(campground);
        }
    });
    //redirect to campgrounds page
    res.redirect("/campgrounds");
});



module.exports = router;