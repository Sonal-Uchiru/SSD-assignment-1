import { IBaseResponse } from '../../../../interfaces/IBaseResponse'

export class CreatePaddyFieldResponse implements IBaseResponse {
    id: string
    time: Date
    constructor(id: string) {
        ;(this.id = id), (this.time = new Date())
    }
}
