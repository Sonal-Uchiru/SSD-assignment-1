import { Request, Response } from 'express'
import AggrerianDivisionService from '../../services/AggrerianDivisionService'

class AggrerianDivisionController {
    async saveAggrerianDivisionAsync(req: Request, res: Response): Promise<Response> {
        return await AggrerianDivisionService.saveAggrerianDivisionAsync(req, res)
    }

    async getAggrerianDivisionListAsync(req: Request, res: Response): Promise<Response> {
        return await AggrerianDivisionService.getAggrerianDivisionListAsync(req, res)
    }
}

export default new AggrerianDivisionController()
