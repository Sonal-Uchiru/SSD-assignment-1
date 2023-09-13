import { INotification } from '../../../../types/interfaces/models/INotificationModel'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListNotificationResponse implements IBaseQueryResponse {
    time: Date
    items: INotification[]
    count: number
    totalCount: number

    constructor(items: INotification[], count: number, totalCount: number) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
