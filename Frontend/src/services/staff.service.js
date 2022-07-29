import instance from './interceptor';

const API_URL = "staff/";

class StaffService {
    findUser(ssn){
        return instance
        .get(API_URL + ssn + "/search")
        .then(res=>{
            return res.data;
        });
    }

    getAllStaff() {
        return instance
            .get(API_URL)
            .then(res => {
                return res.data;
            });
    }

    addStaff(data) {
        return instance
            .post(API_URL, data)
            .then(res=>{
                return res.data;
            })
            .catch(err=>{
                //TODO: Handle error messages
            });
    }

    deleteStaff(staffId) {
        return instance
            .delete(API_URL + staffId);
    }
}

export default new StaffService();


