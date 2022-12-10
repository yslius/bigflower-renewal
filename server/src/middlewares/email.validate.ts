import {Request, Response, NextFunction} from 'express'
import { emailUnique } from '../services/users.service'

export const EMAIL_UNIQUE = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let isExists =  await emailUnique(req.body)
        if (isExists) {
            return res.status(404).json({
                message: 'Email is exists.',
                path: 'email'
            })
        }
        next()
    } catch (error: any) {
        return res.status(400).send({
            message: `Validate error: ${error.message}`
        })
    }
}