import { Router } from 'express'
import SlopeLevelController from '../../controllers/protected/SlopeLevelController'
import { AuthorizedUserRoles } from '../../middlewares/Authorization'
import { UserRoles } from '../../types/enum/user/UserRoles'

const slopeLevelRoute = Router()

slopeLevelRoute.post(
    '/',
    AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
    SlopeLevelController.saveSlopeLevelAsync
)

slopeLevelRoute.get(
    '/list',
    AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
    SlopeLevelController.getSlopeLevelListAsync
)

export default slopeLevelRoute
