var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var DriverSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

DriverSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Driver", DriverSchema);