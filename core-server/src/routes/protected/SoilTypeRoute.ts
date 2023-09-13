import { Router } from 'express'
import SoilTypeController from '../../controllers/protected/SoilTypeController'

const soilTypeRoute = Router()

soilTypeRoute.post(
    '/',
    SoilTypeController.saveSoilTypeAsync
)

soilTypeRoute.get(
    '/list',
    SoilTypeController.getSoilTypeListAsync
)

export default soilTypeRoute
