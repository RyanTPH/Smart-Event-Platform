const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// connectDB();

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware used to handle form data
app.use(express.urlencoded({ extended: true }));

// Middleware used to handle JSON data
app.use(express.json());

// Session configuration for storing logged-in users
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Authentication routes
app.use("/", require("./routes/authRoutes"));

// Home page route
app.get("/", (req, res) => {
    res.render("home");
});

// Login page route
app.get("/login", (req, res) => {
    res.render("login");
});

// Register page route
app.get("/register", (req, res) => {
    res.render("register");
});

// Dashboard page route
app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

// Admin management page route
app.get("/management", (req, res) => {
    res.render("management");
});

// Contact page route
app.get("/contact", (req, res) => {
    res.render("contact");
});

// Server port setup
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
