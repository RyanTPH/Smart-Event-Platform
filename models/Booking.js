const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    // USER RELATIONSHIP
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // EVENT RELATIONSHIP
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    totalPrice: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);