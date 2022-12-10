import {Request, Response, NextFunction} from 'express'
import { get } from 'lodash'
import { reIssueAccessToken } from '../services/users.service'
import { verifyJwt } from '../utils/jwt'
import config from 'config'

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {    
    let accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
    let cookieA = get(req, 'headers.cookie', '').split('; ')
    
    let access = cookieA.filter((i: string) => {
        return i.includes(config.get<string>('TOKEN_ACCESS'))
    })[0]??''
    let refresh = cookieA.filter((i: string) => {
        return i.includes(config.get<string>('TOKEN_REFRESH'))
    })[0]??''

    accessToken = accessToken == '' ? access.replace(`${config.get<string>('TOKEN_ACCESS')}=`, '') : accessToken
    let refreshToken = refresh.replace(`${config.get<string>('TOKEN_REFRESH')}=`, '')
   
    if (!accessToken) {
        return res.status(301).json({
            status: false,
            message: 'Authorization wrong'
        })
    }

    const {decoded, expired} = verifyJwt(accessToken)

    if (decoded) {
        res.locals.user = decoded
        return next()
    }
    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({refreshToken})
        if (newAccessToken) {
            res.cookie(config.get<string>('TOKEN_ACCESS'), accessToken, config.get<object>('OPTION_COKIE'))
            const result = verifyJwt(newAccessToken)
            res.locals.user = result.decoded
        }
        return next()
    }
    return next()
}

export default deserializeUser