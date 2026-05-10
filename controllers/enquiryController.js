const Enquiry = require("../models/Enquiry");

const enquiryController = {

    //Handling an event where a user wants to lodge a complaint
    createEnqiry: async (req, res) => {
        try {
            const data = req.body;
            const enquire = await Enquiry.create(data);

            res.json(enquire);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    //handling event wher admin waould like to view enquiries made or stored in the system
    getAllEnquirires: async (req, res) => {
        try {
            const enquire = await Enquiry.find();

            res.json(enquire);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    //event where admin would want to edit the status field of an enquiry
    updateEnquiryStatus: async (req, res) => {
        try {
            const id = req.params.id;
            const {status} = req.body;
            const enquire = await Enquiry.findByIdAndUpdate(id,
                {$set: status},
                {new: true}
            );
            res.json(enquire);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    //handling the event an admin wants to delete and enquiry from the available records
    deleteEnquiry: async (req,res)=>{
        try {
            const id = req.params.id;
            const enquire = await Enquiry.findByIdAndDelete(id);
            res.json(enquire);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}

module.exports = enquiryController;