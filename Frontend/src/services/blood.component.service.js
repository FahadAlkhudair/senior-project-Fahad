import axios from 'axios';
import config from '../config';
import AuthService from './auth.service';

const API_URL = config.backend_url + "api/blood-component/donations/";

class BloodComponentService {
    getAllDonationTypes() {
        return axios
            .get(API_URL)
            .then(res=>{
                return res.data;
            });
    }

    createDonationType(data) {
        return axios
            .post(API_URL, data,
                {
                    headers: AuthService.header()
                }
            )
            .then(res=>{
                return res.data;
            })
            .catch(err=>{
                //TODO: Handle error messages
            });
    }

    deleteDonationType(donationTypeId) {
        return axios
            .delete(API_URL + donationTypeId,
                {
                    headers: AuthService.header()
                });
    }

    updateDonationType(donationTypeId, data) {
        return axios
            .patch(API_URL + donationTypeId, data,
                {
                    headers: AuthService.header()
                });
    }
}

export default new BloodComponentService();

