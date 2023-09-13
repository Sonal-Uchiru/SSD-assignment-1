import { Router } from 'express'
import SlopeLevelController from '../../controllers/protected/SlopeLevelController'

const slopeLevelRoute = Router()

slopeLevelRoute.post(
    '/',
    SlopeLevelController.saveSlopeLevelAsync
)

slopeLevelRoute.get(
    '/list',
    SlopeLevelController.getSlopeLevelListAsync
)

export default slopeLevelRoute
