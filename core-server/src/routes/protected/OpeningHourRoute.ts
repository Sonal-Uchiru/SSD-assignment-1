import { Router } from 'express'
import OpeningHourController from '../../controllers/protected/OpeningHourController'

const openingHourRoute = Router()

openingHourRoute.post('/', OpeningHourController.saveOpeningHourAsync)

openingHourRoute.get('/list', OpeningHourController.getOpeningHourListAsync)

export default openingHourRoute
