import { Router } from 'express'
import LocationController from '../../controllers/protected/LocationController'
import { AuthorizedUserRoles } from '../../middlewares/Authorization'
import { UserRoles } from '../../types/enum/user/UserRoles'

const locationRoute = Router()

locationRoute.post(
    '/',
    AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
    LocationController.saveLocationAsync
)

locationRoute.get(
    '/list',
    AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
    LocationController.getLocationListAsync
)

export default locationRoute
