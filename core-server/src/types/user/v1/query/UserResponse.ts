import { IBaseResponse } from '../../../../types/interfaces/IBaseResponse'
import { IUser } from '../../../interfaces/models/IUserModel'

export class UsersResponse implements IBaseResponse {
    time: Date
    user: IUser

    constructor(user: IUser) {
        ;(this.time = new Date()), (this.user = user)
    }
}
