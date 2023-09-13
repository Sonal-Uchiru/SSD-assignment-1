import { Request, Response } from 'express'
import UserService from '../../services/UserService'

class UserPublicController {
    async saveUserAsync(req: Request, res: Response): Promise<Response> {
        return await UserService.saveUserAsync(req, res)
    }

    async changePasswordUserAsync(req: Request, res: Response): Promise<Response> {
        return await UserService.changePasswordUserPublicAsync(req, res)
    }
}

export default new UserPublicController()
