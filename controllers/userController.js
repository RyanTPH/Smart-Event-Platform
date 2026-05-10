const User = require("../models/User");
const bcrypt = require("bcrypt"); //package installed
const jwt = require("jsonwebtoken");

const userController = {
    //method to register users
    registerUser: async (req, res) => {
        try {
            const { email, password, username } = req.body;

            //check if user exists
            const existing = await User.findOne({ email });
            if (existing) return res.status(400).json({ message: "User already already exists" });//handling resposne of user registrating while they exist in the database
            //hashpassword
            const hashPassword = await bcrypt.hash(req.body.password, 10);

            //creae new user
            const register = await User.craete({ username, email, password: hashPassword });

            // return the user
            res.json(register);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    //method to login
    loginUser: async (req, res) => {
        try {
            const { password, email } = req.body;

            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: "Invalid credentials" });

            const isMatch = await bcrypt.compare(password, user.password);//"password" from req.body "user.password" from DB
            if (!isMatch) return res.status(400).json({ message: "Invalid crendentials" });

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.json({ token, User: { id: user.id, name: user.username, email: user.email } });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getProfile: async (req, res) => {
        try {
            res.json({ message: "Profile" })
        } catch (error) {
            res.status(500).json({ message: err.message });
        }
    }
}
module.exports = userController;