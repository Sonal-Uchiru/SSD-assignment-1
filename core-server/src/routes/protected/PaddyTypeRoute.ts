import { Router } from 'express'
import PaddyTypeController from '../../controllers/protected/PaddyTypeController'

const paddyTypeRoute = Router()

paddyTypeRoute.post(
    '/',
    PaddyTypeController.savePaddyTypeAsync
)

paddyTypeRoute.get(
    '/list',
    PaddyTypeController.getPaddyTypeListAsync
)

export default paddyTypeRoute
