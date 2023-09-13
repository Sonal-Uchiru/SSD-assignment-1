import { IBaseResponse } from '../../interfaces/IBaseResponse'
import { MetaData } from '../MetaData'

export class AuthUserResponse implements IBaseResponse {
    token: string
    metaData: MetaData
    time: Date

    constructor(token: string, metaData: MetaData) {
        ;(this.token = token), (this.metaData = metaData)
        this.time = new Date()
    }
}
