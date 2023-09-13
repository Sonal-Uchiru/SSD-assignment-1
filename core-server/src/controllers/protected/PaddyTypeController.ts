import { Request, Response } from 'express'
import PaddyTypeService from '../../services/PaddyTypeService'

class PaddyTypeController {
    async savePaddyTypeAsync(req: Request, res: Response): Promise<Response> {
        return await PaddyTypeService.savePaddyTypeAsync(req, res)
    }

    async getPaddyTypeListAsync(req: Request, res: Response): Promise<Response> {
        return await PaddyTypeService.getPaddyTypeListAsync(req, res)
    }
}

export default new PaddyTypeController()
