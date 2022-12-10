import jwt from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get<string>('PRIVATE_KEY').replace(/\n\s+/g, "\n")
const publicKey = config.get<string>('PUBLIC_KEY').replace(/\n\s+/g, "\n")

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256"
    })
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey )
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: true,
            expired: error.message == 'jwt expired',
            decoded: null
        }
    }
}