import { Router } from 'express'
import HarvestPredictionController from '../../controllers/protected/HarvestPredictionController'

const harvestPredictionRoute = Router()

harvestPredictionRoute.post(
    '/',
    HarvestPredictionController.saveHarvestPredictionAsync
)

harvestPredictionRoute.get(
    '/list',
    HarvestPredictionController.getHarvestPredictionListByUserAsync
)

harvestPredictionRoute.get(
    '/:id',
    HarvestPredictionController.getHarvestPredictionAsync
)

harvestPredictionRoute.post(
    '/:id/feedback',
    HarvestPredictionController.submitPredictionFeedBackAsync
)

harvestPredictionRoute.delete(
    '/:id',
    HarvestPredictionController.deleteHarvestPredictionAsync
)

export default harvestPredictionRoute
