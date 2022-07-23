const { auth } = require('../middlewares');
const controller = require('../controllers/blood-component.controller');

module.exports = function (app) {
    // Allow Headers
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );

        next();
    });

    // List all donation types
    app.get(
        "/api/blood-component/donations",
        controller.findAllDonationTypes
    );

    // Create blood donation type
    app.post(
        "/api/blood-component/donations",
        [auth.verifyToken, auth.isAdministrator],
        controller.createDonationType
    );

    // Delete blood component type
    app.delete(
        "/api/blood-component/donations/:donationTypeId",
        [auth.verifyToken, auth.isAdministrator],
        controller.deleteDonationType
    );

    // Update Blood donation type
    app.patch(
        "/api/blood-component/donations/:donationTypeId",
        [auth.verifyToken, auth.isAdministrator],
        controller.updateDonationType
    )
};