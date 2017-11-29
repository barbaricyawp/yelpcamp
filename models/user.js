var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    birthDate: Date,
    role: {type: String, default: "Customer"},
    address: [
        {
            name: String,
            address1: String,
            address2: String,
            city: String,
            state: String,
            zipCode: String,
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);