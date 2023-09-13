import { Router } from 'express'
import CultivationMethodController from '../../controllers/protected/CultivationMethodController'

const cultivationMethodRoute = Router()

cultivationMethodRoute.post(
    '/',
    CultivationMethodController.saveCultivationMethodAsync
)

cultivationMethodRoute.get(
    '/list',
    CultivationMethodController.getCultivationMethodListAsync
)

export default cultivationMethodRoute
