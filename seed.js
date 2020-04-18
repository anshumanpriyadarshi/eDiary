let mongoose = require("mongoose");

let Campground = require("./models/campgrounds");

let Comment = require("./models/comment");




var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        desc: "Tadiandamol trekking trip was amazing. Tadiandamol trek is beautiful and these talented group of people organizing it made it more beautiful. They are really friendly guys and treat you like their friends and not just as a person who has paid for trip. They bond really well."
    },
    {
        name: "Desert Mesa", 
        image: "https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/Campground.jpg",
        desc: "Tadiandamol trekking trip was amazing. Tadiandamol trek is beautiful and these talented group of people organizing it made it more beautiful. They are really friendly guys and treat you like their friends and not just as a person who has paid for trip. They bond really well."
        
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        desc: "Tadiandamol trekking trip was amazing. Tadiandamol trek is beautiful and these talented group of people organizing it made it more beautiful. They are really friendly guys and treat you like their friends and not just as a person who has paid for trip. They bond really well."
        
    }
]


let SeedDB = ()=>{
    Campground.deleteMany({},(err)=>{
        if(err){
            console.log(err);
        }
        else{
        //     console.log("Removed all campgrounds");    
        //     //ADD campgrounds 
           Comment.deleteMany({},(err)=>{
               if(err){
                   console.log(err);
               }
               else{
                // data.forEach((seed)=>{
        //             Campground.create(seed,(err,campground)=>{
        //                 if(err){
        //                     console.log(err);            
        //                 }
        //                 else{
        //                     console.log("Added Campground");
                            
        //                     //CREATE comments
        //                     Comment.create({
        //                         text : "aloo lelo lelo onion!",
        
        //                         author : "Albalaha"
        //                     },(err,comment)=>{
        //                         if(err){
        //                             console.log(err);
        //                         }
        //                         else{
        //                             campground.comment.push(comment);
        //                             campground.save();
        //                             console.log("comment pushed")
        //                         }
        //                     })
        //                 }
        //             })
        //         })
        //        }
        //    });
           
                
        }
    });
    }
});
}

module.exports = SeedDB;
