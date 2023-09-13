import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
import { getToken } from './GetToken'
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../config/.env' })

export const decode = async (req: Request): Promise<JwtPayload> => {

    const token = await getToken(req)
    let decodedToken: JwtPayload
    if (!token) {
        throw new Error('Authorization token is required')
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded:JwtPayload) => {
        if (err) {
            throw new Error('Error : ' + err)
        }

        decodedToken = decoded
    })
    return decodedToken
}
