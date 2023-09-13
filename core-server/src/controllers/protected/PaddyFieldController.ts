import { Request, Response } from 'express'
import PaddyFieldService from '../../services/PaddyFieldService'

class PaddyFieldController {
    async savePaddyFieldAsync(req: Request, res: Response): Promise<Response> {
        return await PaddyFieldService.savePaddyFieldAsync(req, res)
    }

    async deletePaddyFieldAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        return await PaddyFieldService.deletePaddyFieldAsync(req, res)
    }

    async getPaddyFieldAsync(req: Request, res: Response): Promise<Response> {
        return await PaddyFieldService.getPaddyFieldAsync(req, res)
    }

    async getPaddyFieldListAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        return await PaddyFieldService.getPaddyListAsync(req, res)
    }
}

export default new PaddyFieldController()
