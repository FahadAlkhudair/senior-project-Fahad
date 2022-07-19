import axios from 'axios';
import config from '../config';
import AuthService from './auth.service';

const API_URL = config.backend_url + "api/user/";
const CONSTANTS = {
    profileUrl: API_URL + "profile",
    profileStorageKey:"__Profile__"
}

class ProfileService {
    getProfile() {
        return axios
            .get(CONSTANTS.profileUrl,
                {
                    headers: AuthService.header()
                })
            .then(res=>{
                return res.data;
            });
    }

    updateProfile(data) {
        return axios
            .post(CONSTANTS.profileUrl, data,
                {
                    headers: AuthService.header()
                })
            .then(res => {
                localStorage.setItem(CONSTANTS.profileStorageKey, JSON.stringify({
                    name: res.data.name
                }));

                return res.data;
            })
            .catch(res => {
                // TODO: Perform error handling
            });
    }

    getUsername() {
        return new Promise((resolve, reject) => {
            // If not authenticated short circuit
            if (AuthService.header()?.Authorization === undefined) {
                resolve("");
            } else {
                var profile = JSON.parse(localStorage.getItem(CONSTANTS.profileStorageKey));
                if (profile === null) {
                    this.getProfile()
                        .then(data => {
                            localStorage.setItem(CONSTANTS.profileStorageKey, JSON.stringify({
                                name: data.name
                            }));
                            resolve(data.name);
                        })
                        .catch(err => {
                            reject(err);
                        });
                } else {
                    resolve(profile.name);
                }
            }
        })
    }
}

export default new ProfileService();
