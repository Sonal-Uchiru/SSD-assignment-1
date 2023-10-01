import { Router } from 'express'
import WaterInoutLocationController from '../../controllers/protected/WaterInoutLocationController'
import { AuthorizedUserRoles } from '../../middlewares/Authorization'
import { UserRoles } from '../../types/enum/user/UserRoles'

const waterInoutLocationRoute = Router()

waterInoutLocationRoute.post(
    '/',
    AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
    WaterInoutLocationController.saveWaterInoutLocationAsync
)

waterInoutLocationRoute.get(
    '/list',
    AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
    WaterInoutLocationController.getWaterInoutLocationListAsync
)

export default waterInoutLocationRoute
