import {users, Users} from '../models/users.model'
import logs from '../utils/logs'
import omit from 'lodash.omit'
import { signJwt, verifyJwt } from "../utils/jwt"
import { get } from 'lodash'
import config from 'config'
import bcrypt from 'bcrypt'

export function createUser(input: Users) {
    return users.create({...input})
    .then((result) => {
        return omit(result.toJSON(), 'password')
    }).catch((err) => {
        logs.error(err)
    })
}

export function updateUser(query: any ,input: Users) {
    return users.update({
        ...input
    }, {
        where:{...query}
    })
    .then((result: any) => {
        return result
    }).catch((err: any) => {
        logs.error(err)
    })
}

export async function validatePassword({email, password}:{email: string, password: string}) {
    try {
        const user: any = await users.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return false
        }else{
            
            const isValid = bcrypt.compareSync(password, user.password)
            return !isValid ? false : omit(user.toJSON(), 'password')
        }
    }
    catch(err: any) {
        logs.error(err)
    }
}

export async function emailUnique({email}:{email: string}) {
    return users.findOne({
        where: {
            email: email
        }
    })
    .then((result: any) => {
        if (result.email) {
            return true
        }else{
            return false
        }
    }).catch((err) => {
        return false
    })
}

export function findUser(query: any){
    return users.findOne({
        where:{
            ...query
        }
    })
    .then((result) => {
        return result
    }).catch((err) => {
        logs.error(err)  
    })
}

export async function reIssueAccessToken({refreshToken}:{refreshToken: string}){
    const {decoded} = verifyJwt(refreshToken)
    if (!decoded || !get(decoded, 'id')) {
        return false
    }
    const user: any = await users.findOne({
        where:{
            id: get(decoded, 'id')
        }
    })
   
    if (!user || !user.session) {
        return false
    }
    const accessToken = signJwt({
        ...omit(user, ['password', 'session'])
    },
    {
        expiresIn: config.get('ACCESS_TOKEN_TTL')
    })
    return accessToken
}