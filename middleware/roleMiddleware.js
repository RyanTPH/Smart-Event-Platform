exports.isAdmin = (req, res, next) => {

    if(req.session.user.role !== "admin"){
        return res.send("Access denied");
    }

    next();

};