import instance from './interceptor';

const API_URL = "blood-component/donations/";

class BloodComponentService {
    getAllDonationTypes() {
        return instance
            .get(API_URL)
            .then(res=>{
                return res.data;
            });
    }

    createDonationType(data) {
        return instance
            .post(API_URL, data)
            .then(res=>{
                return res.data;
            })
            .catch(err=>{
                //TODO: Handle error messages
            });
    }

    deleteDonationType(donationTypeId) {
        return instance
            .delete(API_URL + donationTypeId);
    }

    updateDonationType(donationTypeId, data) {
        return instance
            .patch(API_URL + donationTypeId, data);
    }
}

export default new BloodComponentService();


