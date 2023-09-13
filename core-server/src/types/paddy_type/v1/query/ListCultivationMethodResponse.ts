import { IPaddyType } from '../../../interfaces/models/IPaddyTypeModel'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListPaddyTypeResponse implements IBaseQueryResponse {
    time: Date
    items: IPaddyType[]
    count: number
    totalCount: number

    constructor(
        items: IPaddyType[],
        count: number,
        totalCount: number
    ) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
