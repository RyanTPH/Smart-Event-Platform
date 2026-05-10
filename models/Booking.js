const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    numberOfTickets: {
        type: Number,
        required: true,
        min: 1
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Confirmed", "Cancelled"]
    }
});

module.exports = mongoose.model("Booking", bookingsSchema)