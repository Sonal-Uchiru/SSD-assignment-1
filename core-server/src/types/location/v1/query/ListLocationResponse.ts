import { ILocation } from '../../../interfaces/models/ILocationModel'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListLocationResponse implements IBaseQueryResponse {
    time: Date
    items: ILocation[]
    count: number
    totalCount: number

    constructor(
        items: ILocation[],
        count: number,
        totalCount: number
    ) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
