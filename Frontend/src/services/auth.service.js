import instance, {clearTokens, currentUser} from './interceptor';

const API_URL = "auth/";
const CONSTANTS = {
    signupUrl: API_URL + "signup",
    signinUrl: API_URL + "signin",
    userStorageKey: "__User__",
    profileStorageKey:"__Profile__"
};

class AuthService {
    signin(email, password) {
        return instance
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
        return instance
            .post(CONSTANTS.signupUrl,
                {
                    role,
                    email,
                    password
                });
    }

    getUser() {
        return currentUser();
    }

    signOut() {
        clearTokens();
    }
}

export default new AuthService();