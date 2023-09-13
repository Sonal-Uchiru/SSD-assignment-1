import { ISoilType } from '../../../interfaces/models/ISoilTypeModel'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListSoilTypeResponse implements IBaseQueryResponse {
    time: Date
    items: ISoilType[]
    count: number
    totalCount: number

    constructor(
        items: ISoilType[],
        count: number,
        totalCount: number
    ) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
