import instance, { getAccessToken} from './interceptor';

const API_URL =  "user/";
const CONSTANTS = {
    profileUrl: API_URL + "profile",
    profileStorageKey:"__Profile__"
}

class ProfileService {
    getProfile() {
        return instance
            .get(CONSTANTS.profileUrl)
            .then(res=>{
                return res.data;
            });
    }

    updateProfile(data) {
        return instance
            .post(CONSTANTS.profileUrl, data)
            .then(res => {
                localStorage.setItem(CONSTANTS.profileStorageKey, JSON.stringify({
                    name: res.data.name,
                    location: res.data.coordinates.coordinates,
                    institution: res.data?.institution,
                    donorNumber: res.data.donorNumber
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
            if (getAccessToken() === undefined) {
                resolve("");
            } else {
                var profile = JSON.parse(localStorage.getItem(CONSTANTS.profileStorageKey));
                if (profile === null) {
                    this.getProfile()
                        .then(data => {
                            localStorage.setItem(CONSTANTS.profileStorageKey, JSON.stringify({
                                name: data.name,
                                location: data.coordinates.coordinates,
                                institution: data?.institution,
                                donorNumber: data.donorNumber
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
    

    getDonorNumber() {
        return new Promise((resolve, reject) => {
            // If not authenticated short circuit
            if (getAccessToken() === undefined) {
                resolve("");
            } else {
                var profile = JSON.parse(localStorage.getItem(CONSTANTS.profileStorageKey));
                if (profile === null) {
                    this.getProfile()
                        .then(data => {
                            localStorage.setItem(CONSTANTS.profileStorageKey, JSON.stringify({
                                name: data.name,
                                location: data.coordinates.coordinates,
                                institution: data?.institution,
                                donorNumber: data.donorNumber
                            }));
                            resolve(data.donorNumber);
                        })
                        .catch(err => {
                            reject(err);
                        });
                } else {
                    resolve(profile.donorNumber);
                }
            }
        })
    }

    getInstitution(){
        return new Promise((resolve, reject) => {
            var profile = JSON.parse(localStorage.getItem(CONSTANTS.profileStorageKey));
            if (profile === null) {
                this.getProfile()
                    .then(data => {
                        localStorage.setItem(CONSTANTS.profileStorageKey, JSON.stringify({
                            name: data.name,
                            location: data.coordinates.coordinates,
                            institution: data?.institution,
                            donorNumber: data.donorNumber
                        }));
                        resolve(data.institution);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } else {
                resolve(profile.institution);
            }
        })
    }
    
    getLocation() {
        return new Promise((resolve, reject) => {
            var profile = JSON.parse(localStorage.getItem(CONSTANTS.profileStorageKey));
            if (profile === null) {
                this.getProfile()
                    .then(data => {
                        localStorage.setItem(CONSTANTS.profileStorageKey, JSON.stringify({
                            name: data.name,
                            location: data.coordinates.coordinates,
                            institution: data?.institution,
                            donorNumber: data.donorNumber
                        }));
                        resolve(data.coordinates.coordinates);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } else {
                resolve(profile.location);
            }
        })
    }
}

export default new ProfileService();
