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

    //  =========================================== 
    // ============== Questionnaires ============== 
    //  ===========================================

    // Create Questionnare
    app.patch(
        "/api/donations/questionnare/:questionnaireId",
        [auth.verifyToken, auth.isAdministrator],
        controller.updateQuestionnaire
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

    //  =========================================== 
    // ============== Exam Resulsts ============== 
    //  ===========================================

    // Post exam results
    app.post(
        "/api/donations/exam-results",
        [auth.verifyToken, auth.isUser],
        controller.postExamResults
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

    //  =========================================== 
    // =========== Blood Drives & Slots =========== 
    //  ===========================================

    // Create Blood Drive campaign
    app.post(
        "/api/donations/blood-drive",
        [auth.verifyToken, auth.isHealthProvider],
        controller.createCampaign
    );

    // Update Blood Drive campaign
    app.patch(
        "/api/donations/blood-drive/:bloodDriveId",
        [auth.verifyToken, auth.isHealthProvider],
        controller.updateCampaign
    );

    // List all Blood Drive campaigns
    app.get(
        "/api/donations/blood-drive",
        [auth.verifyToken],
        controller.findAllCampaigns
    );

    // Get Blood drive campaign
    app.get(
        "/api/donations/blood-drive/:bloodDriveId",
        [auth.verifyToken],
        controller.findCampaign
    );

    // Delete Blood Drive campaigns
    app.delete(
        "/api/donations/blood-drive/:bloodDriveId",
        [auth.verifyToken, auth.isHealthProvider],
        controller.deleteCampaign
    );

    // Get All Slots for campaign
    app.get(
        "/api/donations/blood-drive/:bloodDriveId/slots",
        [auth.verifyToken],
        controller.findAllSlotsForCampaign
    );

    // Create slot
    app.post(
        "/api/donations/blood-drive/slot",
        [auth.verifyToken, auth.isHealthProvider],
        controller.createSlot
    );

    // Update slot
    app.patch(
        "/api/donations/blood-drive/slot/:slotId",
        [auth.verifyToken, auth.isHealthProvider],
        controller.updateSlot
    );

    // Delete Blood Drive campaigns SLot
    app.delete(
        "/api/donations/blood-drive/slot/:slotId",
        [auth.verifyToken, auth.isHealthProvider],
        controller.deleteSlot
    );

    // Create Appointment
    app.post(
        "/api/donations/blood-drive/appointment",
        [auth.verifyToken, auth.isDonor],
        controller.makeAppointment
    );

    // Get appointments
    app.get(
        "/api/donations/blood-drive/appointment/all",
        [auth.verifyToken],
        controller.getAppointments
    );

    // Get provider appointments
    app.get(
        "/api/donations/blood-drive/appointment/provider",
        [auth.verifyToken],
        controller.getProviderAppointments
    );

    // cancel appointments
    app.delete(
        "/api/donations/blood-drive/appointment/:appointmentId",
        [auth.verifyToken],
        controller.cancelAppointment
    );

};