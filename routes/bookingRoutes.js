const express = require("express");
const bookingController = require("../controllers/bookingController");
const bookingRouter = express.Router();
const {protect, isAdmin} = require("../middleware/authMiddleware");
//route to handle request to pull all available records
bookingRouter.get("/", protect, isAdmin, bookingController.getAllBookings);//only and admin can see all bookings. A regular user shouldn't see everyone's bookings

//handling route to get record by id
bookingRouter.get("/:id", protect, bookingController.getBookingById);

//Handling event to create a booking
bookingRouter.post("/", protect, bookingController.createBooking);

//Handling event to update an existing booking
bookingRouter.put("/:id", protect, bookingController.updateBooking);

//Handling event to delete a booking
bookingRouter.delete("/:id", protect, bookingController.deleteBooking);

module.exports = bookingRouter;