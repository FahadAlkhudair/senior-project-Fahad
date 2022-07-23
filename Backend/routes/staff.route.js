const { auth  } = require('../middlewares');
const controller = require('../controllers/staff.controller');

module.exports = function (app) {
    // Allow Headers
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );
        
        next();
    });

    // Find User
    app.get(
        "/api/staff/:ssn/search",
        [auth.verifyToken, auth.isHealthProvider],
        controller.findStaff
    );    
    
    //  Get all staff
    app.get(
        "/api/staff",
        [auth.verifyToken, auth.isHealthProvider],
        controller.getAllStaff
    );

    // Add Staff
    app.post(
        "/api/staff",
        [auth.verifyToken, auth.isHealthProvider],
        controller.addStaff
    );

    // Delete Staff
    app.delete(
        "/api/staff/:staffId",
        [auth.verifyToken, auth.isHealthProvider],
        controller.deleteStaff
    );
};