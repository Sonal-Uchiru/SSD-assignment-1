import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'
import { IAggrerianDivision } from '../../../interfaces/models/IAggrerianDivisionModel'

export class ListAggrerianDivisionsResponse implements IBaseQueryResponse {
    time: Date
    items: IAggrerianDivision[]
    count: number
    totalCount: number

    constructor(
        items: IAggrerianDivision[],
        count: number,
        totalCount: number
    ) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
