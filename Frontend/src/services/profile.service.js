import axios from 'axios';
import config from '../config';
import AuthService from './auth.service';

const API_URL = config.backend_url + "api/user/";
const CONSTANTS = {
    profileUrl: API_URL + "profile"
}

class UserService {
    getProfile() {
        return axios
            .get(CONSTANTS.profileUrl);
    }

    updateProfile(name, contacts, addresses) {
        return axios
            .post(CONSTANTS.profileUrl, {
                name,
                contacts,
                addresses
            },
            {
                headers: AuthService.header()
            })
            .then(res => {
                return res.data;
            })
            .catch(res => {
                // TODO: Perform error handling
            });
    }
}

export default new UserService();
