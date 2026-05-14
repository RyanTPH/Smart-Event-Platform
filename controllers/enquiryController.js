const Enquiry = require("../models/Enquiry");

exports.submitEnquiry = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.render("contact", {
                page: "contact", user: req.session.user || null,
                successMsg: null, errorMsg: "Please fill in all fields."
            });
        }

        await Enquiry.create({ name, email, message: subject ? `${subject}: ${message}` : message });

        res.render("contact", {
            page: "contact", user: req.session.user || null,
            successMsg: "Your enquiry has been submitted!", errorMsg: null
        });

    } catch (error) {
        console.log(error);
        res.render("contact", {
            page: "contact", user: req.session.user || null,
            successMsg: null, errorMsg: "Submission failed. Try again."
        });
    }
};

exports.getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not fetch enquiries." });
    }
};