const jwt = require("jsonwebtoken");//verfiys token
const User = require("../models/User");//to look up the actual user in the DB after the token is verified.

//middleware to ensure that only admins can create or update data within the DB

const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];//Bearer <token>
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");//.select("=password") excludes the password field
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
}
const isAdmin = (req, res, next) => {

    try {
        const role = req.user.role;

        if (role === "Admin") {
            next();
        } else {
            res.status(403).json({ message: "user does not have permission for requested action" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}



module.exports = { protect, isAdmin }