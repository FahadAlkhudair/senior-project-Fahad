import axios from 'axios';
import config from '../config';

export function getAccessToken() {
    const user = JSON.parse(localStorage.getItem(userStorageKey));
    return user?.token;
}

export function clearTokens() {
    localStorage.removeItem(userStorageKey);
    localStorage.removeItem(profileStorageKey);
}

export function currentUser() {
    return  JSON.parse(localStorage.getItem(userStorageKey));
}

const userStorageKey=  "__User__";
const profileStorageKey ="__Profile__";


const instance = axios.create({
    baseURL: config.backend_url + "api/",
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        var token = getAccessToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        //const originalConfig = error.config;
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                clearTokens();
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;