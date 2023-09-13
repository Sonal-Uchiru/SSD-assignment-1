import { Request, Response } from 'express'
import SoilTypeService from '../../services/SoilTypeService'

class SoilTypeController {
    async saveSoilTypeAsync(req: Request, res: Response): Promise<Response> {
        return await SoilTypeService.saveSoilTypeAsync(req, res)
    }

    async getSoilTypeListAsync(req: Request, res: Response): Promise<Response> {
        return await SoilTypeService.getSoilTypeListAsync(req, res)
    }
}

export default new SoilTypeController()
