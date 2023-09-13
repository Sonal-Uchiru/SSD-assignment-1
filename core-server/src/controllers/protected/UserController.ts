import { Request, Response } from 'express'
import UserService from '../../services/UserService'

class UserController {
    async getUserAsync(req: Request, res: Response): Promise<Response> {
        return await UserService.getUserAsync(req, res)
    }

    async getUserListAsync(req: Request, res: Response): Promise<Response> {
        return await UserService.getUserListAsync(req, res)
    }

    async updateUserAsync(req: Request, res: Response): Promise<Response> {
        return await UserService.updateUserAsync(req, res)
    }

    async deleteUserAsync(req: Request, res: Response): Promise<Response> {
        return await UserService.deleteUserAsync(req, res)
    }

    async changePasswordUserAsync(req: Request, res: Response): Promise<Response> {
        return await UserService.changePasswordUserAsync(req, res)
    }
}

export default new UserController()
