const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.render("auth", { page: "auth", user: null, successMsg: null, errorMsg: "Please fill in all fields." });
        }
        if (password !== confirmPassword) {
            return res.render("auth", { page: "auth", user: null, successMsg: null, errorMsg: "Passwords do not match." });
        }
        if (password.length < 6) {
            return res.render("auth", { page: "auth", user: null, successMsg: null, errorMsg: "Password must be at least 6 characters." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("auth", { page: "auth", user: null, successMsg: null, errorMsg: "Email already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword, role: role || "user" });

        res.render("auth", { page: "auth", user: null, successMsg: "Registered successfully! You can now log in.", errorMsg: null });

    } catch (error) {
        console.log(error);
        res.render("auth", { page: "auth", user: null, successMsg: null, errorMsg: "Registration failed. Try again." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("auth", { page: "auth", user: null, successMsg: null, errorMsg: "Please enter your email and password." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.render("auth", { page: "auth", user: null, successMsg: null, errorMsg: "Invalid email or password." });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render("auth", { page: "auth", user: null, successMsg: null, errorMsg: "Invalid email or password." });
        }

        // Save full user info to session
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        // Redirect admin to admin page, users to bookings
        if (user.role === "admin") {
            return res.redirect("/admin");
        }
        res.redirect(`/bookings?name=${encodeURIComponent(user.name)}`);

    } catch (error) {
        console.log(error);
        res.render("auth", { page: "auth", user: null, successMsg: null, errorMsg: "Login failed. Try again." });
    }
};