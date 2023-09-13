import { IHarvestPrediction } from '../../../../types/interfaces/models/IHarvestPredictionModel'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListharvestPredictionResponse implements IBaseQueryResponse {
    time: Date
    items: IHarvestPrediction[]
    count: number
    totalCount: number

    constructor(
        items: IHarvestPrediction[],
        count: number,
        totalCount: number
    ) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
