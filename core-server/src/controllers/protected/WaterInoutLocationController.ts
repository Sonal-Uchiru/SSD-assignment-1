import { Request, Response } from 'express'
import WaterInoutLocationService from '../../services/WaterInoutLocationService'

class WaterInoutLocationController {
    async saveWaterInoutLocationAsync(req: Request, res: Response): Promise<Response> {
        return await WaterInoutLocationService.saveWaterInoutLocationAsync(req, res)
    }

    async getWaterInoutLocationListAsync(req: Request, res: Response): Promise<Response> {
        return await WaterInoutLocationService.getWaterInoutLocationListAsync(req, res)
    }
}

export default new WaterInoutLocationController()
