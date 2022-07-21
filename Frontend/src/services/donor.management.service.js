import axios from 'axios';
import config from '../config';
import authService from './auth.service';
import AuthService from './auth.service';

const API_URL = config.backend_url + "api/donations/";
const CONSTANTS = {
    questionnareUrl: API_URL + "questionnare",
    examResultsUrl: API_URL + "exam-results",
    bloodDriveUrl: API_URL + "blood-drive",
    bloodDriveSlotUrl: bloodDriveUrl + "/slot",
    appointmentUrl: bloodDriveUrl + "/appointment"
};

class DonationManagementService {
   
    // Questionnaires 
  

    createQuestionnaire(data) {
        return axios
            .post(CONSTANTS.questionnareUrl, data,
                {
                    headers: AuthService.header()
                });
    }

    deleteQuestionnair(questionnaireId) {
        return axios
            .delete(CONSTANTS.questionnareUrl + questionnaireId,
                {
                    headers: AuthService.header()
                });
    }

    markQuestionnaireActive(questionnaireId) {
        return axios
            .patch(CONSTANTS.questionnareUrl + questionnaireId + "/active", {},
                {
                    headers: AuthService.header()
                });
    }

    getAllQuestionnaires() {
        return axios
            .get(CONSTANTS.questionnareUrl,
                {
                    headers: AuthService.header()
                });
    }

    //  =========================================== 
    // ============== Exam Results ============== 
    //  ===========================================

    getAllExamsResults() {
        return axios
            .get(CONSTANTS.examResultsUrl,
                {
                    headers: AuthService.header()
                });
    }

    getAllExamResults(donorId) {
        return axios
            .get(CONSTANTS.examResultsUrl,
                {
                    headers: AuthService.header()
                });
    }

    postExamResults(data) {
        return axios
            .post(CONSTANTS.examResultsUrl, data,
                {
                    headers: AuthService.header()
                });
    }

    //  =========================================== 
    // =========== Blood Drives & Slots =========== 
    //  ===========================================

    createCampaign(data) {
        return axios
            .post(CONSTANTS.bloodDriveUrl, data,
                {
                    headers: AuthService.header()
                });
    }

    getAllCampaigns() {
        return axios
            .get(CONSTANTS.bloodDriveUrl,
                {
                    headers: AuthService.header()
                });
    }

    deleteCampaign(campaignId) {
        return axios
            .delete(CONSTANTS.bloodDriveUrl + campaignId,
                {
                    headers: authService.header()
                });
    }

    createCampaignSlot(data) {
        return axios
            .post(CONSTANTS.bloodDriveSlotUrl, data, {
                headers: authService.header()
            });
    }

    makeAppointment(data) {
        return axios
            .post(CONSTANTS.appointmentUrl, data,
                {
                    headers: authService.header()
                });
    }
}

export default new UserService();