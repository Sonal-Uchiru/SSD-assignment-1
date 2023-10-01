import { Router } from 'express'
import AggrerianDivisionController from '../../controllers/protected/AggrerianDivisionController'
import { AuthorizedUserRoles } from '../../middlewares/Authorization'
import { UserRoles } from '../../types/enum/user/UserRoles'

const aggrerianDivisionRoute = Router()

aggrerianDivisionRoute.post(
    '/',
    AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
    AggrerianDivisionController.saveAggrerianDivisionAsync
)

aggrerianDivisionRoute.get(
    '/list',
    AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
    AggrerianDivisionController.getAggrerianDivisionListAsync
)

export default aggrerianDivisionRoute
