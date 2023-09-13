import { IPaddyField } from '../../../../types/interfaces/models/IPaddyFieldModel'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListPaddyFieldResponse implements IBaseQueryResponse {
    time: Date
    items: IPaddyField[]
    count: number
    totalCount: number

    constructor(items: IPaddyField[], count: number, totalCount: number) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
