import { IBaseResponse } from '../../../../interfaces/IBaseResponse'

export class CreateLocationResponse implements IBaseResponse {
    id: string[]
    time: Date
    constructor(id: string[]) {
        ;(this.id = id), (this.time = new Date())
    }
}
