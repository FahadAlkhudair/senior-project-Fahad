const controller = require('../controllers/user.controller');

module.exports = function (app) {
    // Allow Headers
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );
        
        next();
    });

    // Get Profile
    app.get(
        "/api/user/profile",
        [auth.verifyToken],
        controller.getProfile
    );

    // Update Profile
    app.post(
        "/api/user/profile",
        [auth.verifyToken],
        controller.updateProfile
    );
};