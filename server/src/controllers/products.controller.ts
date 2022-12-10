import {Request, Response} from 'express'
import { getProducts } from '../services/products.services'

export function products(req: Request, res: Response){
    let params: any = req.params
    if (params.type_sale) {
        getProducts(params)
        .then((result: any) => {
            return res.status(200).json({
                status: true,
                data: result.result,
                totals: result.totals
            })
        }).catch((err) => {
            return res.status(404).json({
                status: false,
                messages: 'Data is not founds.',
                error: err
            })
        })
    } else {
        return res.status(404).json({
            status: false,
            messages: 'Data is not founds.',
        })
    }
}

export function orders(req: Request, res: Response){
    return res.status(404).json({
        status: false,
        messages: 'Data is not founds.',
    })
}