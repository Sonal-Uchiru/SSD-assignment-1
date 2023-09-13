import { Request, Response } from 'express'
import LocationService from '../../services/LocationService'

class LocationController {
    async saveLocationAsync(req: Request, res: Response): Promise<Response> {
        return await LocationService.saveLocationAsync(req, res)
    }

    async getLocationListAsync(req: Request, res: Response): Promise<Response> {
        return await LocationService.getLocationListAsync(req, res)
    }
}

export default new LocationController()
