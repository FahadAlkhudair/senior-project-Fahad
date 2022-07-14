const { auth } = require('../middlewares');
const controller = require('../controllers/donation.controller');

module.exports = function (app) {
    // Allow Headers
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );

        next();
    });

    
    // ============== Questionnaires ============== 
    

    // Create Questionnare
    app.post(
        "/api/donations/questionnare",
        [auth.verifyToken, auth.isAdministrator],
        controller.createQuestionnaire
    );

    // Delete Questionnaire
    app.delete(
        "/api/donations/questionnare/:questionnaireId",
        [auth.verifyToken, auth.isAdministrator],
        controller.deleteQuestionnaire
    );

    // Mark Questionare as Active
    app.patch(
        "/api/donations/questionnare/:questionnaireId/active",
        [auth.verifyToken, auth.isAdministrator],
        controller.markQuestionnaireAsActive
    );

    // List all questionnaires
    app.get(
        "/api/donations/questionnare",
        controller.findAllQuestionnaires
    );

    
    // ============== Exam Resulsts ============== 
    

    // Post exam results
    app.post(
        "/api/donations/exam-results",
        [auth.verifyToken, auth.isUser],
        controller.createQuestionnaire
    );

    // List all exam results
    app.get(
        "/api/donations/exam-results",
        [auth.verifyToken, auth.isUser],
        controller.findAllExamResults
    );

    // List all exam results for specific donor
    app.get(
        "/api/donations/exam-results/:donorId",
        [auth.verifyToken, auth.isUser],
        controller.findAllExamResultsForDonor
    );

    
    // =========== Blood Drives & Slots =========== 
    

    // Create Blood Drive campaign
    app.post(
        "/api/donations/blood-drive",
        [auth.verifyToken, auth.isHealthProvider],
        controller.createCampaign
    );

    // List all Blood Drive campaigns
    app.get(
        "/api/donations/blood-drive",
        [auth.verifyToken],
        controller.findAllCampaigns
    );

    // Delete Blood Drive campaigns
    app.delete(
        "/api/donations/blood-drive",
        [auth.verifyToken, auth.isHealthProvider],
        controller.deleteCampaign
    );

    // Create slot
    app.post(
        "/api/donations/blood-drive/slot",
        [auth.verifyToken, auth.isHealthProvider],
        controller.createSlot
    );

    // Create Appointment
    app.post(
        "/api/donations/blood-drive/appointment",
        [auth.verifyToken, auth.isDonor],
        controller.makeAppointment
    );

}; 