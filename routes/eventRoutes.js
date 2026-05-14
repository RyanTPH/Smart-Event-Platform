const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");

const { isLoggedIn } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

router.post("/", isLoggedIn, isAdmin, eventController.createEvent);

router.get("/", eventController.getEvents);

router.put("/:id", isLoggedIn, isAdmin, eventController.updateEvent);

router.delete("/:id", isLoggedIn, isAdmin, eventController.deleteEvent);

module.exports = router;