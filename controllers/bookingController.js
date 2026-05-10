
const Booking = require("../models/Booking");
const Event = require("../models/Events");

const bookingController = {
    //Handling request to pull available or stored events
    getAllBookings: async (req, res) => {
        try {
            const bookEvent = await Booking.find();

            res.json(bookEvent);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    //find a booking by id
    getBookingById: async (req, res) => {
        try {
            const id = req.params.id;
            const bookEvent = await Booking.findById(id);

            //message to display in the case the is not found 
            if (!bookEvent) return res.status(404).json({ message: "Booking not found" });
            res.json(bookEvent);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
    //create a booking 
    createBooking: async (req, res) => {
        try {
            const { eventId, numberOfTickets } = req.body;

            //fetching available events
            const event = await Event.findById(eventId);
            //check to see if event exists
            if (!event) return req.status(404).json({ message: "Event not found" });

            const booking = await Booking.create({
                userId: req.user._id, //from protect middleware
                eventId,
                numberOfTickets,
                totalPrice: event.price * numberOfTickets
            })

            res.json(booking);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    //Update booking
    updateBooking: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body;
            const UpdateBooking = await Booking.findByIdAndUpdate(
                id,
                { $set: newData },
                { new: true }
            );
            res.json(UpdateBooking);
        } catch (err) {
            res.status(500).json({ messgae: err.message })
        }
    },
    //delete a booking
    deleteBooking: async (req, res) => {
        try {
            const id = req.params.id;
            const DeleteBooking = await Booking.findByIdAndDelete(id);//first filters all records in the document and deletes the one found
            res.json(DeleteBooking);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}

module.exports = bookingController;