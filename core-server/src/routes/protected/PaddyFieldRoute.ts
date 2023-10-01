import { Router } from 'express'
import PaddyFieldController from '../../controllers/protected/PaddyFieldController'
import { AuthorizedUserRoles } from '../../middlewares/Authorization'
import { UserRoles } from '../../types/enum/user/UserRoles'

const paddyFieldRoute = Router()

paddyFieldRoute.post(
    '/',
    AuthorizedUserRoles([UserRoles.Farmer]),
    PaddyFieldController.savePaddyFieldAsync
)

paddyFieldRoute.get(
    '/list',
    AuthorizedUserRoles([UserRoles.Farmer]),
    PaddyFieldController.getPaddyFieldListAsync
)

paddyFieldRoute.get(
    '/:id',
    AuthorizedUserRoles([UserRoles.Farmer]),
    PaddyFieldController.getPaddyFieldAsync
)

paddyFieldRoute.delete(
    '/:id',
    AuthorizedUserRoles([UserRoles.Farmer]),
    PaddyFieldController.deletePaddyFieldAsync
)

export default paddyFieldRoute
