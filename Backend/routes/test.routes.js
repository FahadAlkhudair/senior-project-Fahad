const { auth } = require('../middlewares');
const controller = require('../controllers/test.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );

        next();
    });

    app.get("/api/test/all", controller.all);
    
    app.get(
        "/api/test/admin",
        [auth.verifyToken, auth.isAdministrator],
        controller.admin
    );
    
    app.get(
        "/api/test/health-provider",
        [auth.verifyToken, auth.isHealthProvider],
        controller.healthProvder
    );
    
    app.get(
        "/api/test/donor",
        [auth.verifyToken, auth.isDonor],
        controller.donor
    );

    app.get(
        "/api/test/user",
        [auth.verifyToken, auth.isUser],
        controller.donor
    );
};