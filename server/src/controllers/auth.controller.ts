import {Request, Response} from 'express'
import config from 'config'
import { findUser, updateUser } from '../services/users.service'
import { validatePassword } from '../services/users.service'
import { signJwt } from '../utils/jwt'
import { omit } from 'lodash'

export async function authUser(req: Request, res: Response) {
    const user = await validatePassword(req.body)
    if(!user){
        return res.status(401).send({
            status: false,
            message: "Invalid email or password"
        })
    }
    const accessToken = signJwt({
            ...omit(user, ['password', 'session'])
        },
        {
            expiresIn: config.get('ACCESS_TOKEN_TTL')
        }
    )
    const refreshToken = signJwt({
            ...omit(user, ['password', 'session'])
        },
        {
            expiresIn: config.get('REFRESH_TOKEN_TTL')
        }
    )

    await updateUser({
        id: user.id
    },{
        session: refreshToken
    })

    res.cookie(config.get<string>('TOKEN_ACCESS'), accessToken, config.get<object>('OPTION_COKIE'))
    res.cookie(config.get<string>('TOKEN_REFRESH'), refreshToken, config.get<object>('OPTION_COKIE'))

    return res.status(200).send({
        status: true,
        refreshToken: refreshToken, 
        accessToken: accessToken,
        user: user
    })
}



/**
 * Xoa session đang được sử dụng của người dùng
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 */
export async function authUserDelete(req: Request, res: Response){
    const userId = res.locals.user.id
    await updateUser({id: userId}, {session: ''})

    res.clearCookie(config.get<string>('TOKEN_ACCESS'))
    res.clearCookie(config.get<string>('TOKEN_REFRESH'))
    
    return res.send({
        status: true,
        accessToken: null,
        refreshToken: null,
    })
}

export function authUserInfo (req: Request, res: Response){
    const user = res.locals.user
    if (user) {
        return res.send({
            status: true,
            data: user,
        })
    } else { 
        return res.status(404).send({
            status: false,
            message: 'User Auth fails',
        })
    }
}