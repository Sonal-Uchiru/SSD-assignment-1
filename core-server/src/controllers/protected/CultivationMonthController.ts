import { Request, Response } from 'express'
import CultivationMonthService from '../../services/CultivationMonthService'

class CultivationMonthController {
    async saveCultivationMonthAsync(req: Request, res: Response): Promise<Response> {
        return await CultivationMonthService.saveCultivationMonthAsync(req, res)
    }

    async getCultivationMonthListAsync(req: Request, res: Response): Promise<Response> {
        return await CultivationMonthService.getCultivationMonthListAsync(req, res)
    }
}

export default new CultivationMonthController()
