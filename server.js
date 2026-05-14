const { isLoggedIn } = require("./middleware/authMiddleware");
const { isAdmin } = require("./middleware/roleMiddleware");
const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ── Routes from DB app ──────────────────────────────────────
app.use("/auth",      require("./routes/authRoutes"));
app.use("/events",    require("./routes/eventRoutes"));
app.use("/bookings",  require("./routes/bookingRoutes"));
app.use("/dashboard", require("./routes/dashboardRoutes"));
app.use("/enquiries", require("./routes/enquiryRoutes"));

// ── Page renders (your original frontend routes) ────────────
const eventController = require("./controllers/eventController");

app.get("/", eventController.getEvents);

app.get("/admin", isLoggedIn, isAdmin, (req, res) => {
    res.render("admin", { page: "admin", user: req.session.user || null });
});

app.get("/bookings", isLoggedIn, (req, res) => {
    const name = req.session.user?.name || req.query.name || "Guest";
    res.render("bookings", { page: "bookings", user: req.session.user || null, name });
});

app.get("/contact", (req, res) => {
    res.render("contact", { page: "contact", user: req.session.user || null, successMsg: null, errorMsg: null });
});

app.post("/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.render("contact", {
            page: "contact", user: req.session.user || null,
            successMsg: null, errorMsg: "Please fill in all fields."
        });
    }
    try {
        const Enquiry = require("./models/Enquiry");
        await Enquiry.create({ name, email, message: `${subject}: ${message}` });
        res.render("contact", {
            page: "contact", user: req.session.user || null,
            successMsg: "Thanks! Your enquiry has been sent.",
            errorMsg: null
        });
    } catch (err) {
        res.render("contact", {
            page: "contact", user: req.session.user || null,
            successMsg: null, errorMsg: "Something went wrong. Please try again."
        });
    }
});

app.get("/auth",          (req, res) => res.render("auth", { page: "auth", user: null, successMsg: null, errorMsg: null }));
app.get("/auth/login",    (req, res) => res.redirect("/auth"));
app.get("/auth/register", (req, res) => res.redirect("/auth?tab=register"));

app.post("/auth/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

// 404
app.use((req, res) => res.status(404).send("404 Page Not Found"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));