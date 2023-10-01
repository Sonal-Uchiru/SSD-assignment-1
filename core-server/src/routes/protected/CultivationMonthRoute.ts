import { Router } from 'express'
import CultivationMonthController from '../../controllers/protected/CultivationMonthController'
import { AuthorizedUserRoles } from '../../middlewares/Authorization'
import { UserRoles } from '../../types/enum/user/UserRoles'

const cultivationMonthRoute = Router()

cultivationMonthRoute.post(
    '/',
    AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
    CultivationMonthController.saveCultivationMonthAsync
)

cultivationMonthRoute.get(
    '/list',
    AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
    CultivationMonthController.getCultivationMonthListAsync
)

export default cultivationMonthRoute
