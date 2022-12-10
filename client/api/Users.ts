import api from './ApiBase'
import { AUTH } from './router'
const {POST, GET, PUT, DELETE} = api
const config = {
    headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
    }
}
export default {
    login: (body: any): Promise<any[]> => {
        return POST(`${AUTH}`, body, config)
        .then((result) => {
            return result
        }).catch((err) => {
            console.log('api sigIn error: ', err)
        })
    },
    logout: (body: any): Promise<any[]> => {
        return PUT(`${AUTH}`, body, config)
        .then((result) => {
            return result
        }).catch((err) => {
            console.log('api sigOut error: ', err)
        })
    },
    infoUser: (): Promise<any[]> => {
        return GET(`${AUTH}`)
        .then((result) => {
            return result
        }).catch((err) => {
            console.log('api get info user error: ', err)
        })
    }
}