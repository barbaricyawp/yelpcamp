var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
        description: "Plaid authentic lo-fi, subway tile iPhone man braid semiotics twee freegan tacos tattooed health goth tumblr kitsch. Man braid bespoke sustainable, pop-up kinfolk bitters truffaut affogato. Drinking vinegar chia 8-bit, keytar sartorial ramps vape. Migas microdosing pitchfork, fam umami keffiyeh fingerstache sartorial tumeric listicle hell of banjo thundercats. Seitan mustache hot chicken cred subway tile thundercats blue bottle church-key, selvage twee vape. Lyft forage flannel pitchfork, blue bottle lomo cronut narwhal selfies vexillologist. Tousled YOLO pour-over meditation. Meggings bicycle rights mlkshk forage authentic fam pabst cornhole activated charcoal master cleanse. Affogato iceland scenester, occupy air plant chia shaman photo booth kickstarter put a bird on it. Tofu letterpress kogi, pabst sriracha lumbersexual hella neutra flannel."
    },
    {
        name: "Swift River",
        image: "https://farm5.staticflickr.com/4424/37433523451_182d529034.jpg",
        description: "Plaid authentic lo-fi, subway tile iPhone man braid semiotics twee freegan tacos tattooed health goth tumblr kitsch. Man braid bespoke sustainable, pop-up kinfolk bitters truffaut affogato. Drinking vinegar chia 8-bit, keytar sartorial ramps vape. Migas microdosing pitchfork, fam umami keffiyeh fingerstache sartorial tumeric listicle hell of banjo thundercats. Seitan mustache hot chicken cred subway tile thundercats blue bottle church-key, selvage twee vape. Lyft forage flannel pitchfork, blue bottle lomo cronut narwhal selfies vexillologist. Tousled YOLO pour-over meditation. Meggings bicycle rights mlkshk forage authentic fam pabst cornhole activated charcoal master cleanse. Affogato iceland scenester, occupy air plant chia shaman photo booth kickstarter put a bird on it. Tofu letterpress kogi, pabst sriracha lumbersexual hella neutra flannel."
    },
    {
        name: "Misty Pines",
        image: "https://farm8.staticflickr.com/7677/17482091193_e0c121a102.jpg",
        description: "Plaid authentic lo-fi, subway tile iPhone man braid semiotics twee freegan tacos tattooed health goth tumblr kitsch. Man braid bespoke sustainable, pop-up kinfolk bitters truffaut affogato. Drinking vinegar chia 8-bit, keytar sartorial ramps vape. Migas microdosing pitchfork, fam umami keffiyeh fingerstache sartorial tumeric listicle hell of banjo thundercats. Seitan mustache hot chicken cred subway tile thundercats blue bottle church-key, selvage twee vape. Lyft forage flannel pitchfork, blue bottle lomo cronut narwhal selfies vexillologist. Tousled YOLO pour-over meditation. Meggings bicycle rights mlkshk forage authentic fam pabst cornhole activated charcoal master cleanse. Affogato iceland scenester, occupy air plant chia shaman photo booth kickstarter put a bird on it. Tofu letterpress kogi, pabst sriracha lumbersexual hella neutra flannel."
    },
];

function seedDB(){
    // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
        if(err){
          console.log(err);
        } else {
          console.log("removed all campgrounds...");
            // ADD CAMPGROUNDS FROM DATA
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground...");
                        // CREATE A COMMENT ON EACH CAMPGROUND
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("added a comment...");
                                }
                            }
                        );
                    }
                });
            });
        }
    });
}

module.exports = seedDB;

