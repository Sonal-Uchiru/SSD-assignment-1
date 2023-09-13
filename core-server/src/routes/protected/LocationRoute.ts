import { Router } from 'express'
import LocationController from '../../controllers/protected/LocationController'

const locationRoute = Router()

locationRoute.post(
    '/',
    LocationController.saveLocationAsync
)

locationRoute.get(
    '/list',
    LocationController.getLocationListAsync
)

export default locationRoute
