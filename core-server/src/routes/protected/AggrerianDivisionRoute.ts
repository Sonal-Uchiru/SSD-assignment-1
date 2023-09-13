import { Router } from 'express'
import AggrerianDivisionController from '../../controllers/protected/AggrerianDivisionController'

const aggrerianDivisionRoute = Router()

aggrerianDivisionRoute.post(
    '/',
    AggrerianDivisionController.saveAggrerianDivisionAsync
)

aggrerianDivisionRoute.get(
    '/list',
    AggrerianDivisionController.getAggrerianDivisionListAsync
)

export default aggrerianDivisionRoute
