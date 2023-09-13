import { IBaseResponse } from '../../../../interfaces/IBaseResponse'

export class DeleteNotificationResponse implements IBaseResponse {
    deleteCount: number
    time: Date
    constructor(deleteCount: number) {
        ;(this.deleteCount = deleteCount), (this.time = new Date())
    }
}
