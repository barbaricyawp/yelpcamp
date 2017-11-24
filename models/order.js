var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    restaurant: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant"
        },
        name: String,
    },
    customer: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        firstName: String,
        lastName: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        zipCode: String,
   },
   driver: {
       id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Driver"
       },
       firstName: String,
       lastName: String
   }
});

module.exports = mongoose.model("Order", orderSchema);