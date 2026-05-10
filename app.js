require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//connection to MongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDb connected"))
    .catch((err)=> console.log(err));

const eventRoutes = require("./routes/enquiryRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());//middleware used to parse data in json format
//every route will use json format to recieve input

app.use("/api/events", eventRoutes);
//app.use("/api/enquiry", enquiryRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/user", userRoutes);


//Route
app.get("/", (req, res) => {
    res.send("Welcome to Express Server");
});


//start server
app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

})