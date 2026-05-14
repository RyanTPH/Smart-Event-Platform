const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const { isLoggedIn } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

router.get("/", isLoggedIn, isAdmin, dashboardController.adminDashboard);

module.exports = router;