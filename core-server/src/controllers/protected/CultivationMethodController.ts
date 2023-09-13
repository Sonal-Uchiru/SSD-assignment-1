import { Request, Response } from 'express'
import CultivationMethodService from '../../services/CultivationMethodService'

class CultivationMethodController {
    async saveCultivationMethodAsync(req: Request, res: Response): Promise<Response> {
        return await CultivationMethodService.saveCultivationMethodAsync(req, res)
    }

    async getCultivationMethodListAsync(req: Request, res: Response): Promise<Response> {
        return await CultivationMethodService.getCultivationMethodListAsync(req, res)
    }
}

export default new CultivationMethodController()
