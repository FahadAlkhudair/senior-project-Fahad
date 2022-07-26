import axios from 'axios';
import config from '../config';
import authService from './auth.service';
import AuthService from './auth.service';

const API_URL = config.backend_url + "api/donations/";
const CONSTANTS = {
    questionnareUrl: API_URL + "questionnare/",
    examResultsUrl: API_URL + "exam-results/",
    bloodDriveUrl: API_URL + "blood-drive/",
    bloodDriveSlotUrl: API_URL + "blood-drive/slot/",
    appointmentUrl: API_URL + "blood-drive/appointment/"
};

class DonationManagementService {
    //  =========================================== 
    // ============== Questionnaires ============== 
    //  ===========================================

    updateQuestionnaire(questionnaireId, data) {
        return axios
            .patch(CONSTANTS.questionnareUrl + questionnaireId , data,
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
                })
                .then(res=>{
                    return res.data
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
                })
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    // TODO: Handle errors

                });
    }

    updateCampaign(campaignId, data){
        return axios
            .patch(CONSTANTS.bloodDriveUrl + campaignId, data,
                {
                    headers: AuthService.header()
                })
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    // TODO: Handle errors

                });
    }

    getAllCampaigns() {
        return axios
            .get(CONSTANTS.bloodDriveUrl,
                {
                    headers: AuthService.header()
                })
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    // TODO: Handle errors
                    
                });
    }

    getCampaign(campaignId){
        return axios
            .get(CONSTANTS.bloodDriveUrl + campaignId,
                {
                    headers: authService.header()
                })
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    // TODO: Handle errors
                    
                });
    }

    deleteCampaign(campaignId) {
        return axios
            .delete(CONSTANTS.bloodDriveUrl + campaignId,
                {
                    headers: authService.header()
                })
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    // TODO: Handle errors
                    
                });
    }

    createCampaignSlot(data) {
        return axios
            .post(CONSTANTS.bloodDriveSlotUrl, data, {
                headers: authService.header()
            })
            .then(res=>{
                return res.data;
            })
            .catch(err=>{
                // TODO: Handle errors
                
            });
    }

    updateCampaignSlot(slotId, data) {
        return axios
            .patch(CONSTANTS.bloodDriveSlotUrl + slotId, data,
                {
                    headers: AuthService.header()
                })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                //TODO: Handle errors

            });
    }

    deleteCampaignSlot(slotId) {
        return axios
            .delete(CONSTANTS.bloodDriveSlotUrl + slotId,
                {
                    headers: authService.header()
                })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                // TODO: Handle errors

            });
    }

    getAllCampaignSlots(campaignId){
        return axios
            .get(CONSTANTS.bloodDriveUrl + campaignId + "/slots",
                {
                    headers: AuthService.header()
                })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                // TODO: Handle errors

            });
    }

    makeAppointment(data) {
        return axios
            .post(CONSTANTS.appointmentUrl, data,
                {
                    headers: authService.header()
                })
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    // TODO: Handle errors
                    
                });
    }
}

export default new DonationManagementService();
