import {Request, Response, NextFunction} from 'express'
import { checkQuantityBySortId } from '../services/products.services'

export const QUANTITY_ORDER = async (req: Request, res: Response, next: NextFunction) => {
    let params = req.body
    try {
        let listOrder =  await checkQuantityBySortId(params)

        if (!listOrder) {
            return res.status(404).json({
                status: false,
                message: 'List order not enable.',
                data: params
            })
        }
        for (let index = 0; index < params.listOrder.length; index++) {
            const item = params.listOrder[index]
            let itemExists = listOrder.filter((i: any)=> i.sort_id == item.sort_id)
            
            if (!itemExists[0].sort_id || item.quantity as number > itemExists[0].inventory) {
                return res.status(404).json({
                    status: false,
                    message: `サイトでは在庫切れの表示になっており、皆さまに混乱およびご迷惑をおかけし申し訳ございませんでした。`,
                    data: {...itemExists[0].dataValues}
                })
            }
        }
        
        res.locals.listOrder = listOrder
        
        next()
    } catch (error: any) {
        return res.status(400).send({
            message: `Validate quantity error: ${error.message}`
        })
    }
}