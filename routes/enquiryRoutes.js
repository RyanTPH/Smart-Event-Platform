const express = require("express");
const enquiryController = require("../controllers/enquiryController");
const enquiryRouter = express.Router();
const {protect, isAdmin} = require("../middleware/authMiddleware");

//route to handle request to pull all available records
enquiryRouter.get("/", protect, isAdmin, enquiryController.getAllEnquirires);//only and admin can see all bookings. A regular user shouldn't see everyone's bookings


//Handling event to create a booking
enquiryRouter.post("/", enquiryController.createEnqiry);

//Handling event to update an existing booking
enquiryRouter.put("/:id", protect, isAdmin, enquiryController.updateEnquiryStatus);

//Handling event to delete a booking
enquiryRouter.delete("/:id", protect, isAdmin, enquiryController.deleteEnquiry);

module.exports = enquiryRouter;