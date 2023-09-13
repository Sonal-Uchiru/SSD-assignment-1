import { Router } from 'express'
import WaterInoutLocationController from '../../controllers/protected/WaterInoutLocationController'

const waterInoutLocationRoute = Router()

waterInoutLocationRoute.post(
    '/',
    WaterInoutLocationController.saveWaterInoutLocationAsync
)

waterInoutLocationRoute.get(
    '/list',
    WaterInoutLocationController.getWaterInoutLocationListAsync
)

export default waterInoutLocationRoute
