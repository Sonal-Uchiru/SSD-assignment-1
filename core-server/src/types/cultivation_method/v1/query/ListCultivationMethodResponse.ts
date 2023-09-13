import { ICultivationMethod } from '../../../interfaces/models/ICultivationMethodModel'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListCultivationMethodResponse implements IBaseQueryResponse {
    time: Date
    items: ICultivationMethod[]
    count: number
    totalCount: number

    constructor(
        items: ICultivationMethod[],
        count: number,
        totalCount: number
    ) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
