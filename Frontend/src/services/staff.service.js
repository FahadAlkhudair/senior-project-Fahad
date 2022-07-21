import axios from 'axios';
import config from '../config';
import AuthService from './auth.service';

const API_URL = config.backend_url + "api/staff/";

class StaffService {
    findUser(ssn){
        return axios
        .get(API_URL + ssn + "/search",
        {
             headers: AuthService.header()
        })
        .then(res=>{
            return res.data;
        });
    }

    getAllStaff() {
        return axios
            .get(API_URL,
                {
                    headers: AuthService.header()
                }
            )
            .then(res => {
                return res.data;
            });
    }

    addStaff(data) {
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

    deleteStaff(staffId) {
        return axios
            .delete(API_URL + staffId,
                {
                    headers: AuthService.header()
                });
    }
}

export default new StaffService();

