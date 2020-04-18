const express = require("express");
let router = express.Router({mergeParams:true});
let Campgrounds  = require("../models/campgrounds");
let Comment      = require("../models/comment");
let middleware = require("../middleware"); // also ("/middleware")

//new comment
router.get("/new", middleware.isLoggedin,(req,res)=>{

    Campgrounds.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:foundCampground});
        }
    });
});

//create
router.post("/", middleware.isLoggedin,(req,res)=>{

    Campgrounds.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,(err,comment)=>{
                if(err){
                    console.log(err);
                }
                else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //Save comment
                    comment.save();
                    foundCampground.comment.push(comment);
                    foundCampground.save((err,doc)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(comment);
                            res.redirect("/campgrounds/" + foundCampground._id);
                        }
                    });
                   // res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });

});

// EDIT route
router.get("/:comment_id/edit", middleware.checkCommentOwnership,(req,res)=>{
    Comment.findById(req.params.comment_id,(err,foundComment)=>{
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{campground_id : req.params.id, comment : foundComment});
        }
    });
});

// update route
router.put("/:comment_id", middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err,comment)=>{
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//delete route
router.delete("/:comment_id", middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndDelete(req.params.comment_id, (err)=>{
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;