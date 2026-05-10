const express = require("express");
const eventController = require("../controllers/eventController");
const eventsRouter = express.Router();
const {protect, isAdmin} = require("../middleware/authMiddleware")

//Handle the request using router: Get all events
eventsRouter.get('/', eventController.getAllEvents);

//Handle the request using router: Get one event
//since in app.js, the routes are defined as "/api/events",
 
//"Protect", "IsAdmin", act as guard for the event route to ensure that only admins can alter the database
// express already prefixes every route in eventRoute
eventsRouter.get("/:id", protect, isAdmin, eventController.getEventById);

//Handle the respond: create event (admin only)
eventsRouter.post("/", protect, isAdmin, eventController.createEvent);

eventsRouter.put("/:id",protect, isAdmin, eventController.updateEvent);

eventsRouter.delete("/:id", protect, isAdmin, eventController.deleteEvent);

module.exports = eventsRouter;