const { verifySignup } = require('../middlewares');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
    // Allow Headers
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );

        next();
    });

    // Signup
    app.post(
        "/api/auth/signup",
        [verifySignup.checkDuplicate, verifySignup.checkRole],
        controller.signup
    );

    // Signin
    app.post(
        "/api/auth/signin",
        controller.signin
    );

    // Refresh Token
    app.post(
        "/api/auth/refresh-token",
        controller.refreshToken
    );
};