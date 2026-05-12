// Middleware used to check if the user is logged in
function authMiddleware(req, res, next) {

   // If user is not logged in, redirect to login page
    if (!req.session.user) {
        return res.redirect("/login");
    }

    // Allow user to continue to the next route
    next();
}

module.exports = authMiddleware;