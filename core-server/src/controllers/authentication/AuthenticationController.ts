import { Request, Response } from 'express'
import AuthenticationService from '../../services/AuthenticationService'

class AuthenticationController {
    async authAsync(req: Request, res: Response): Promise<Response> {
        return await AuthenticationService.authAsync(req, res)
    }
}

export default new AuthenticationController()
