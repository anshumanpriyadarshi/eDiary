let Campgrounds = require("../models/campgrounds");
let Comment = require("../models/comment");



let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campgrounds.findById(req.params.id,(err,foundCampground)=>{
            if(err){
                res.redirect("back");
            }else{
                // does user own campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        }); 
    }else{
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,(err,foundComment)=>{
            if(err){
                res.redirect("back");
            }else{
                // does user own campground?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        }); 
    }else{
        res.redirect("back");
    }
};

middlewareObj.isLoggedin = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};



module.exports = middlewareObj;