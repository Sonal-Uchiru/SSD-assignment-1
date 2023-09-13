import { Router } from 'express'
import CultivationMonthController from '../../controllers/protected/CultivationMonthController'

const cultivationMonthRoute = Router()

cultivationMonthRoute.post(
    '/',
    CultivationMonthController.saveCultivationMonthAsync
)

cultivationMonthRoute.get(
    '/list',
    CultivationMonthController.getCultivationMonthListAsync
)

export default cultivationMonthRoute
