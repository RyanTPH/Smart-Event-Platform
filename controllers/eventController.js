const Event = require("../models/Events");

const eventController = {
    //Handling request to pull al available or stored events
    getAllEvents: async (req, res) => {
        try {
            const events = await Event.find();

            res.json(events)
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    },
    //handling request to pull an event using an id
    getEventById: async (req, res) => {
        try {
            const id = req.params.id;
            const events = await Event.findById(id);
            if (!events) return res.status(404).json({ message: "Event not found" });
            res.json(events);
        } catch (err) {
            res.status(500).json({ message: error.message });

        }
    },
    //Handling request to created event
    createEvent: async (req, res) => {
        try {
            const data = req.body;
            const events = await Event.create(data);
            res.json(events);
        } catch (err) {
            res.status(500).json({ message: err.message });

        }

    },
    //Handling request to update an event (via event id)
    updateEvent: async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body;
            const events = await Event.findByIdAndUpdate(
                id,
                { $set: newData }, // $set updates the provided fields
                { new: true }// option to return the modified document
            );
            res.json(events);
        } catch (err) {
            res.status(500).json({ message: err.message });

        }

    },
    //Handling request to delete an event (via event id)
    deleteEvent: async (req, res) => {
        try {
            const id = req.params.id;
            const events = await Event.findByIdAndDelete(id);//first filters records then deletes 
            res.json(events);
        } catch (err) {
            res.status(500).json({ message: err.message });

        }
    }
}

module.exports = eventController;