import { IWaterInoutLocation } from '../../../../types/interfaces/models/IWaterInoutLocation'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListWaterInoutLocationResponse implements IBaseQueryResponse {
    time: Date
    items: IWaterInoutLocation[]
    count: number
    totalCount: number

    constructor(
        items: IWaterInoutLocation[],
        count: number,
        totalCount: number
    ) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
