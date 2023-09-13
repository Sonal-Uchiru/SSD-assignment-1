import { ICultivationMonth } from '../../../../types/interfaces/models/ICultivationMonthModel'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListCultivationMonthResponse implements IBaseQueryResponse {
    time: Date
    items: ICultivationMonth[]
    count: number
    totalCount: number

    constructor(
        items: ICultivationMonth[],
        count: number,
        totalCount: number
    ) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
