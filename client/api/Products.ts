import api from './ApiBase'
import { PRODUCTS, ORDER_PRODUCTS } from './router'
const {POST, GET, PUT, DELETE} = api

export default {
    getProducts: (tyle_sale: any): Promise<any[]> => {
        return GET(`${PRODUCTS}/${tyle_sale}`)
        .then((result) => {
            return result
        }).catch((err) => {
            console.log('api get products error: ', err)
        })
    },
    orderProducts: (body: any): Promise<any[]> => {
        const config = {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            }
        }
        return POST(`${ORDER_PRODUCTS}`, body, config)
        .then((result) => {
            return result
        }).catch((err) => {
            console.log('api import error: ', err)
        })
    }
}