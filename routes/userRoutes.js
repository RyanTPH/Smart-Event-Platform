const express = require("express");
const UserRouter = express.Router();

//Register a new user
UserRouter.post("/register", (req, res)=>{
    res.json(req.body);
});

//login
UserRouter.post("/login", (req, res)=>{
    res.json(req.body);
});

//get logged-in user's profile
UserRouter.get("/profile", (req, res)=>{
    res.json({message: "Here are users"})
});

module.exports = UserRouter;