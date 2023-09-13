import { IBaseResponse } from '../../../../types/interfaces/IBaseResponse'
import { INotification } from '../../../../types/interfaces/models/INotificationModel'

export class NotificationResponse implements IBaseResponse {
    time: Date
    notification: INotification

    constructor(notification: INotification) {
        ;(this.time = new Date()), (this.notification = notification)
    }
}
