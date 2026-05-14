const Booking = require("../models/Booking");
const Event   = require("../models/Event");
const User    = require("../models/User");

exports.adminDashboard = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const totalUsers    = await User.countDocuments();
        const totalEvents   = await Event.countDocuments();

        const revenueData = await Booking.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
        ]);
        const totalRevenue = revenueData[0]?.totalRevenue || 0;

        const popularEvents = await Booking.aggregate([
            { $group: { _id: "$event", ticketsSold: { $sum: "$quantity" } } },
            { $sort: { ticketsSold: -1 } },
            { $limit: 5 }
        ]);

        const events = await Event.find();

        res.render("admin", {
            page: "admin",
            user: req.session.user,
            totalBookings,
            totalUsers,
            totalEvents,
            totalRevenue,
            popularEvents,
            events,
            successMsg: req.query.success || null,
            errorMsg: null
        });

    } catch (error) {
        console.log(error);
        res.render("admin", {
            page: "admin", user: req.session.user,
            totalBookings: 0, totalUsers: 0, totalEvents: 0,
            totalRevenue: 0, popularEvents: [], events: [],
            successMsg: null, errorMsg: "Could not load dashboard."
        });
    }
};