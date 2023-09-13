import { Request } from 'express'

export const getToken = (req: Request): Promise<string> => {
    return new Promise((resolve) => {
        if (
            req.headers.authorization! &&
            req.headers.authorization?.split(' ')[0] === 'Bearer'
        ) {
            resolve(req.headers.authorization.split(' ')[1])
        }
        return resolve(null!)
    })
}
