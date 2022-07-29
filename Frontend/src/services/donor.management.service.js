import instance from './interceptor';

const API_URL = "donations/";
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
        return instance
            .patch(CONSTANTS.questionnareUrl + questionnaireId , data);
    }

    deleteQuestionnair(questionnaireId) {
        return instance
            .delete(CONSTANTS.questionnareUrl + questionnaireId);
    }

    markQuestionnaireActive(questionnaireId) {
        return instance
            .patch(CONSTANTS.questionnareUrl + questionnaireId + "/active", {});
    }

    getAllQuestionnaires() {
        return instance
            .get(CONSTANTS.questionnareUrl)
                .then(res=>{
                    return res.data
                });
    }

    //  =========================================== 
    // ============== Exam Results ============== 
    //  ===========================================

    getAllExamsResults() {
        return instance
            .get(CONSTANTS.examResultsUrl);
    }

    getAllExamResults(donorId) {
        return instance
            .get(CONSTANTS.examResultsUrl);
    }

    postExamResults(appointmentId,data) {
        console.log(data);
        return instance
            .post(CONSTANTS.examResultsUrl + appointmentId, data);
    }

    //  =========================================== 
    // =========== Blood Drives & Slots =========== 
    //  ===========================================

    createCampaign(data) {
        return instance
            .post(CONSTANTS.bloodDriveUrl, data)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    // TODO: Handle errors

                });
    }

    updateCampaign(campaignId, data){
        return instance
            .patch(CONSTANTS.bloodDriveUrl + campaignId, data)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    // TODO: Handle errors

                });
    }

    getAllCampaigns(params) {
        return instance
            .get(CONSTANTS.bloodDriveUrl,
                {
                    params: params
                })
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    // TODO: Handle errors
                    
                });
    }

    getCampaign(campaignId){
        return instance
            .get(CONSTANTS.bloodDriveUrl + campaignId)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    // TODO: Handle errors
                    
                });
    }

    deleteCampaign(campaignId) {
        return instance
            .delete(CONSTANTS.bloodDriveUrl + campaignId)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    // TODO: Handle errors
                    
                });
    }

    createCampaignSlot(data) {
        return instance
            .post(CONSTANTS.bloodDriveSlotUrl, data)
            .then(res=>{
                return res.data;
            })
            .catch(err=>{
                // TODO: Handle errors
                
            });
    }

    updateCampaignSlot(slotId, data) {
        return instance
            .patch(CONSTANTS.bloodDriveSlotUrl + slotId, data)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                //TODO: Handle errors

            });
    }

    deleteCampaignSlot(slotId) {
        return instance
            .delete(CONSTANTS.bloodDriveSlotUrl + slotId)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                // TODO: Handle errors

            });
    }

    getAllCampaignSlots(campaignId, params){
        return instance
            .get(CONSTANTS.bloodDriveUrl + campaignId + "/slots",
                {
                    params: params
                })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                // TODO: Handle errors

            });
    }

    makeAppointment(data) {
        return instance
            .post(CONSTANTS.appointmentUrl, data)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    // TODO: Handle errors
                    
                });
    }

    getAppointments(params){
        return instance.get(CONSTANTS.appointmentUrl + "all")
        .then(res=>{
            return res.data
        });
    }
    
    getProviderAppointments(params){
        return instance
        .get(CONSTANTS.appointmentUrl + "provider",
            {
                params: params
            })
            .then(res=>{
                return res.data;
            })
            .catch(err=>{
                // TODO: Handle errors
                
            }); 
    }

    cancelAppointment(appointmentId){
        return instance
        .delete(CONSTANTS.appointmentUrl + appointmentId)
            .then(res=>{
                return res.data;
            })
            .catch(err=>{
                // TODO: Handle errors
                
            });  
    }
}

export default new DonationManagementService();
