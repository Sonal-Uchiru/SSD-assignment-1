import { Request, Response } from 'express'
import SlopeLevelService from '../../services/SlopeLevelService'

class SoilLevelController {
    async saveSlopeLevelAsync(req: Request, res: Response): Promise<Response> {
        return await SlopeLevelService.saveSlopeLevelAsync(req, res)
    }

    async getSlopeLevelListAsync(req: Request, res: Response): Promise<Response> {
        return await SlopeLevelService.getSlopeLevelListAsync(req, res)
    }
}

export default new SoilLevelController()
