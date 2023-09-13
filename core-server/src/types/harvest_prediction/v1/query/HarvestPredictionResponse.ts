import { IBaseResponse } from '../../../../types/interfaces/IBaseResponse'
import { IHarvestPrediction } from '../../../../types/interfaces/models/IHarvestPredictionModel'

export class HarvestPredictionResponse implements IBaseResponse {
    time: Date
    harvestPrediction: IHarvestPrediction

    constructor(harvestPrediction: IHarvestPrediction) {
        ;(this.time = new Date()), (this.harvestPrediction = harvestPrediction)
    }
}
