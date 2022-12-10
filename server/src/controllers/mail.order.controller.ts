import {Request, Response} from 'express'
import dayjs from 'dayjs'
import { sendMail } from '../utils/mailler'
import config from 'config'
import { updateQuantity } from '../services/products.services'

export async function sendMailOrder(req: Request, res: Response){
    let params = req.body
    let listOrder = res.locals.listOrder

    // Cap nhat lai so luong ton kho
    await updateQuantity(params, listOrder)

    // Gui mail cho khach hang
    await sendMail({
        to: params.info.email,
        subject: '受注承諾メールご注文受付のお知らせ',
        template: 'mail.order_customer',
        context: {
            name: params.info.name,
        }
    }) 
    // Gui mail cho admin
    sendMail({
        to: config.get<string>('ML_ADMIN'),
        subject: '注文',
        template: 'mail.order',
        context: {
            ...params.info,
            listOrder: params.listOrder,
            dayCreate: dayjs().format('YYYY-MM-DD H:m:s')
        }
    })
    .then((result) => {
        if (result) {
            res.status(200).json({
                status: true,
                messager: 'Send mail complete',
            })
        }else{
            res.status(404).json({
                status: false,
                messager: 'Send mail not complete', 
            })
        }
    }).catch((err) => {
        return res.status(503).json(err.message)
    })
}