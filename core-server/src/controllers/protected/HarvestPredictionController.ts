import { Request, Response } from 'express'
import HarvestPredictionService from '../../services/HarvestPredictionService'

class HarvestPredictionController {
    async saveHarvestPredictionAsync(req: Request, res: Response): Promise<Response> {
        return await HarvestPredictionService.saveHarvestPredictionAsync(req, res)
    }

    async deleteHarvestPredictionAsync(req: Request, res: Response): Promise<Response> {
        return await HarvestPredictionService.deleteHarvestPredictionAsync(req, res)
    }

    async submitPredictionFeedBackAsync(req: Request, res: Response): Promise<Response> {
        return await HarvestPredictionService.submitPredictionFeedBackAsync(req, res)
    }

    async getHarvestPredictionAsync(req: Request, res: Response): Promise<Response> {
        return await HarvestPredictionService.getHarvestPredictionAsync(req, res)
    }

    async getHarvestPredictionListByUserAsync(req: Request, res: Response): Promise<Response> {
        return await HarvestPredictionService.getHarvestPredictionListByUserAsync(req, res)
    }
}

export default new HarvestPredictionController()
