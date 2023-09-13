import { Request, Response } from 'express'
import OpeningHourService from '../../services/OpeningHourService'

class OpeningHourController {
    async saveOpeningHourAsync(req: Request, res: Response): Promise<Response> {
        return await OpeningHourService.saveOpeningHourAsync(req, res)
    }

    async getOpeningHourListAsync(req: Request, res: Response): Promise<Response> {
        return await OpeningHourService.getOpeningHourListAsync(req, res)
    }
}

export default new OpeningHourController()
