import { Router } from 'express'
import PaddyFieldController from '../../controllers/protected/PaddyFieldController'

const paddyFieldRoute = Router()

paddyFieldRoute.post(
    '/',
    PaddyFieldController.savePaddyFieldAsync
)

paddyFieldRoute.get(
    '/list',
    PaddyFieldController.getPaddyFieldListAsync
)

paddyFieldRoute.get(
    '/:id',
    PaddyFieldController.getPaddyFieldAsync
)

paddyFieldRoute.delete(
    '/:id',
    PaddyFieldController.deletePaddyFieldAsync
)

export default paddyFieldRoute
