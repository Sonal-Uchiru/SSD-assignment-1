import { IBaseResponse } from '../../../../types/interfaces/IBaseResponse'
import { IPaddyField } from '../../../../types/interfaces/models/IPaddyFieldModel'

export class PaddyFieldResponse implements IBaseResponse {
    time: Date
    paddyField: IPaddyField

    constructor(paddyField: IPaddyField) {
        ;(this.time = new Date()), (this.paddyField = paddyField)
    }
}
