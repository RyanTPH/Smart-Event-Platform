// Middleware used to check if the logged-in user is an Admin
function adminMiddleware(req, res, next) {

    // Check if there is no logged-in user
    // or if the user role is not Admin
    if (!req.session.user || req.session.user.role !== "Admin") {
       
         // Return access denied message
        return res.status(403).send("Access Denied");
    }

    // Allow user to continue to the next route
    next();
}

// Export middleware so it can be used in routes
module.exports = adminMiddleware;