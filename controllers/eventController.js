const Event = require("../models/Event");

// CREATE EVENT
exports.createEvent = async (req, res) => {
    try {
        const {
            title,
            category,
            date,
            location,
            price,
            availableTickets
        } = req.body;

        await Event.create({
            title,
            category,
            date,
            location,
            price,
            availableTickets
        });

        res.redirect("/admin?success=Event+created");

    } catch (error) {
        console.log("Create Event Error:", error);

        res.redirect("/admin?error=Could+not+create+event");
    }
};

// GET EVENTS
exports.getEvents = async (req, res) => {
    try {

        const {
            search,
            category,
            date,
            availability
        } = req.query;

        const query = {};

        // Search filter
        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            };
        }

        // Category filter
        if (category) {
            query.category = category;
        }

        // Date filter
        if (date) {

            const selectedDate = new Date(date);

            selectedDate.setHours(0, 0, 0, 0);

            query.date = {
                $gte: selectedDate
            };
        }

        // Availability filter
        if (availability === "available") {
            query.availableTickets = {
                $gt: 0
            };
        }

        if (availability === "soldout") {
            query.availableTickets = 0;
        }

        const events = await Event.find(query)
            .sort({ date: 1 });

        console.log(events);

        res.render("index", {
            page: "home",
            user: req.session.user || null,
            events,
            search: search || "",
            category: category || "",
            date: date || "",
            availability: availability || "",
            successMsg: null,
            errorMsg: null
        });

    } catch (error) {

        console.log("Get Events Error:", error);

        res.render("index", {
            page: "home",
            user: req.session.user || null,
            events: [],
            search: "",
            category: "",
            date: "",
            availability: "",
            successMsg: null,
            errorMsg: "Could not load events."
        });
    }
};

// UPDATE EVENT
exports.updateEvent = async (req, res) => {
    try {

        await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.redirect("/admin?success=Event+updated");

    } catch (error) {

        console.log("Update Event Error:", error);

        res.redirect("/admin?error=Could+not+update+event");
    }
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
    try {

        await Event.findByIdAndDelete(req.params.id);

        res.redirect("/admin?success=Event+deleted");

    } catch (error) {

        console.log("Delete Event Error:", error);

        res.redirect("/admin?error=Could+not+delete+event");
    }
};

console.log("events from db:" , Event.events);