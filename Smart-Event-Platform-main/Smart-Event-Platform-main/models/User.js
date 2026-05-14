// Create User Schema for storing user information
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    // Username field
    username: {
        type: String,
        required: true,
        unique: true
    },

    // Email field
    email: {
        type: String,
        required: true,
        unique: true
    },

     // Password field
    password: {
        type: String,
        required: true
    },

       // User role field
    role: {
        type: String,
        enum: ["Admin", "Standard User"],
        default: "Standard User"
    }

});

// Export User model
module.exports = mongoose.model("User", userSchema);