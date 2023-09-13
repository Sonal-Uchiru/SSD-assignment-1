import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'
import { IOpeningHours } from '../../../interfaces/models/IOpeningHours'

export class ListOpeningHoursResponse implements IBaseQueryResponse {
    time: Date
    items: IOpeningHours[]
    count: number
    totalCount: number

    constructor(items: IOpeningHours[], count: number, totalCount: number) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
