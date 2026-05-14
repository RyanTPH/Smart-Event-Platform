const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

const { isLoggedIn } = require("../middleware/authMiddleware");

router.post("/", isLoggedIn, bookingController.bookTicket);

router.get("/my-bookings", isLoggedIn, bookingController.userBookings);

module.exports = router;