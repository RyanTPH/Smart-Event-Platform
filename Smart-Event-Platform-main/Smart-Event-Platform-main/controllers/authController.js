const User = require("../models/User");
const bcrypt = require("bcrypt");


// Register User
exports.registerUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = new User({

            username,
            email,
            password: hashedPassword

        });

        await user.save();

        res.redirect("/login");

    } catch (error) {

        console.log(error);

        res.send("Registration Failed");
    }
};


// Login User
exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.send("User Not Found");
        }

        // Compare Password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {

            return res.send("Incorrect Password");
        }

        // Save User Session
        req.session.user = {

            id: user._id,
            role: user.role

        };

        res.redirect("/dashboard");

    } catch (error) {

        console.log(error);

        res.send("Login Failed");
    }
};