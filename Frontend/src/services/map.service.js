import axios from 'axios';
import config from '../config';

const API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const API_KEY = config.API_KEY;

class MapService {
    geoCode(street, city,state, zipCode) {        
        const address = street + ", " + city + "," + state + ", " + zipCode;

        return axios
            .get(API_URL, {
                params:{
                    address: address,
                    key: API_KEY
                }
            })
            .then(res=>{
                if(res.data.status==="OK"){
                    var loc = res.data.results[0].geometry.location;
                    return {longitude: loc.lng,lattitude: loc.lat};
                }else if(res.data.status==="ZERO_RESULTS"){

                    return axios
                    .get(API_URL, {
                        params:{
                            address: zipCode,
                            key: API_KEY
                        }
                    })
                    .then(res=>{
                        var loc = res.data.results[0].geometry.location;
                        return {longitude: loc.lng,lattitude: loc.lat};
                    })
                }
            });
    }

    geoCodeAddress(address){
        return this.geoCode(address.street,address.city,address.state,address.zipCode);
    }
}

export default new MapService();


