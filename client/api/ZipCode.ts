import config from "config"
import axios from 'axios'

export default function getAddress(zipcode: string) {
    let url = `https://${config.API_ZIPCODE}${zipcode}`
    return axios.get(url)
    .then((result) => {
        return result.data[0]
    }).catch((err) => {
        
    });
}