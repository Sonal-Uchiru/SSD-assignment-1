import { Router } from 'express'
import CultivationMethodController from '../../controllers/protected/CultivationMethodController'
import { AuthorizedUserRoles } from '../../middlewares/Authorization'
import { UserRoles } from '../../types/enum/user/UserRoles'

const cultivationMethodRoute = Router()

cultivationMethodRoute.post(
    '/',
    AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
    CultivationMethodController.saveCultivationMethodAsync
)

cultivationMethodRoute.get(
    '/list',
    AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
    CultivationMethodController.getCultivationMethodListAsync
)

export default cultivationMethodRoute
