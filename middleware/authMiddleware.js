exports.isLoggedIn = (req, res, next) => {

    if(!req.session.user){
        return res.send("Please login first");
    }

    next();

};
