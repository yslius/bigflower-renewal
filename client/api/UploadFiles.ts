import api from './ApiBase'
import { IMPORT, UPLOAD_FILES } from './router'
const {POST, GET, PUT, DELETE} = api

export default {
    uploadFile: (body: any): Promise<any[]> => {
        const config = {
            headers: {
                'Accept': 'multipart/form-data',
            }
        }

        return POST(`${UPLOAD_FILES}`, body, config)
        .then((result) => {
            return result
        }).catch((err) => {
            console.log('api upload files error: ', err)
        })
    },
    importData: (body: any): Promise<any[]> => {
        const config = {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            }
        }
        return POST(`${IMPORT}`, body, config)
        .then((result) => {
            return result
        }).catch((err) => {
            console.log('api import error: ', err)
        })
    }
}