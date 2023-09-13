import { ISlopeLevel } from '../../../interfaces/models/ISlopeLevel'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListSlopeLevelResponse implements IBaseQueryResponse {
    time: Date
    items: ISlopeLevel[]
    count: number
    totalCount: number

    constructor(
        items: ISlopeLevel[],
        count: number,
        totalCount: number
    ) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
