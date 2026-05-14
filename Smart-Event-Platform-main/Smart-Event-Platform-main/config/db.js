const mongoose = require("mongoose");

// Function used to connect the application to MongoDB
const connectDB = async () => {

    try {

        // Connect to MongoDB using the connection string stored in .env
        await mongoose.connect(process.env.MONGO_URI);

         // Message displayed if connection is successful
        console.log("MongoDB Connected");

    } catch (error) {

        // Display error if database connection fails
        console.log(error);

        // Stop application if MongoDB connection fails
        process.exit(1);
    }
};

// Export function so it can be used inside app.js
module.exports = connectDB;