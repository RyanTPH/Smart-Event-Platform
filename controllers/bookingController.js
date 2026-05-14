const Booking = require("../models/Booking");
const Event   = require("../models/Event");

exports.bookTicket = async (req, res) => {
    try {
       const { eventId, quantity } = req.body;

       const event = await Event.findById(eventId);
        if (!event) {
            return res.render("bookings", {
                page: "bookings", user: req.session.user,
                name: req.session.user.name,
                errorMsg: "Event not found.", successMsg: null, bookings: []
            });
        }

        if (event.ticketsSold + Number(quantity) > event.capacity) {
            return res.render("bookings", {
                page: "bookings", user: req.session.user,
                name: req.session.user.name,
                errorMsg: "Not enough tickets available.", successMsg: null, bookings: []
            });
        }

        const totalPrice = quantity * event.price;

        await Booking.create({
            user: req.session.user.id,
            event: event._id,
            quantity,
            totalPrice
        });

        event.ticketsSold += Number(quantity);
        await event.save();

        res.redirect("/bookings?success=true");

    } catch (error) {
        console.log(error);
        res.redirect("/bookings");
    }
};

exports.userBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.session.user.id }).populate("event");

        res.render("bookings", {
            page: "bookings",
            user: req.session.user,
            name: req.session.user.name,
            bookings,
            successMsg: req.query.success ? "Booking confirmed!" : null,
            errorMsg: null
        });

    } catch (error) {
        console.log(error);
        res.render("bookings", {
            page: "bookings", user: req.session.user,
            name: req.session.user.name,
            bookings: [], successMsg: null, errorMsg: "Could not load bookings."
        });
    }
};