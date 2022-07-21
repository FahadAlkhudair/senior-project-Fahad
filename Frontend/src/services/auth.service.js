import axios from 'axios';
import config from '../config';

const API_URL = config.backend_url + "api/auth/";
const CONSTANTS = {
    signupUrl: API_URL + "signup",
    signinUrl: API_URL + "signin",
    userStorageKey: "__User__",
    profileStorageKey:"__Profile__"
};

class AuthService {
    header() {
        const user = JSON.parse(localStorage.getItem(CONSTANTS.userStorageKey));
        if (user && user.token) {
            return { Authorization: "Bearer " + user.token };
        } else {
            return {}
        }
    }

    signin(email, password) {
        return axios
            .post(CONSTANTS.signinUrl,
                {
                    email,
                    password
                })
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem(CONSTANTS.userStorageKey, JSON.stringify(res.data));
                }

                return res.data;
            });
    }

    signup(role, email, password) {
        return axios
            .post(CONSTANTS.signupUrl,
                {
                    role,
                    email,
                    password
                });
    }

    getUser() {
        return  JSON.parse(localStorage.getItem(CONSTANTS.userStorageKey));
    }

    signOut() {
        localStorage.removeItem(CONSTANTS.userStorageKey);
        localStorage.removeItem(CONSTANTS.profileStorageKey);
    }
}

export default new AuthService();