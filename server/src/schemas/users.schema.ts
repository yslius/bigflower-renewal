import {number, object, string, z} from "zod"
import { emailUnique } from "../services/users.service"

const schema = object({
    first_name: string({
        required_error: 'First name is required'
    }).min(3, 'First name should be 3 chars  minimum.')
    .max(50, 'First name should be 50 chars  maximum.'),
    last_name: string({
        required_error: 'Last name is required'
    }).min(3, 'Last name should be 3 chars  minimum.')
    .max(50, 'Last name should be 50 chars  maximum.'),
    email: string({
        required_error: 'Email is required.'
    }).email('Email not is valid email.'),
    password: string({
        required_error: 'Password is required.'
    }).min(6, 'Password should be 6 chars  minimum.'),
    password_confirm: string({
        required_error: 'Password is required.'
    }),
    roles: number({
        required_error: 'Roles is required'
    })
})

export const CREATE_USER = object({
    body: schema
    .refine((data: any) => {
        return data.password === data.password_confirm
    }, {
        message: 'Password confirm do not match.',
        path: ['password_confirm']
    })
})

export const UPDATE_USER = object({
    params: object({
        id: number({
            required_error: 'Id is required'
        })
    }),
    body: CREATE_USER.deepPartial()
})

export const LOGIN = object({
    body: object({
        email: string({
            required_error: 'Email is required.'
        }).email('Email not is valid email.'),
        password: string({
            required_error: 'Password is required.'
        }).min(6, 'Password should be 6 chars  minimum.')
    })
})