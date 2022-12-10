import {Request, Response} from 'express'
import logs from '../utils/logs'
import {createUser, updateUser} from '../services/users.service'

export async function create(req: Request, res: Response){
    try {
        const user = await createUser(req.body)
        return res.status(200).send({
            status: true,
            data: user
        })
    } catch (e:any) {
        logs.error(e)
        return res.status(409).send({
            status: false,
            messager: e.message
        })
    }
}

export async function update(req: Request, res: Response){
    try {
        let condition = {
            _id: req.params.id
        }
        await updateUser(condition, req.body)
        logs.warn(`User update, condition: ${condition} data: ${req.body}`)
        return res.status(200).send({
            ...condition,
            ...req.body,
            messages: 'Update complete',
            status: true
        })
    } catch (e:any) {
        logs.error(e)
        return res.status(409).send({
            status: false,
            message: e.message
        })
    }
}

export async function getUserInfo(req: Request, res: Response){
    try {
        let condition = {
            _id: req.params.id
        }
        await updateUser(condition, req.body)
        logs.warn(`User update, condition: ${condition} data: ${req.body}`)
        return res.status(200).send({
            ...condition,
            ...req.body,
            messages: 'Update complete'
        })
    } catch (e:any) {
        return res.status(409).send({
            status: false,
            message: e.message
        })
    }
}