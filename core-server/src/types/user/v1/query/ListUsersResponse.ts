import { IUser } from '../../../interfaces/models/IUserModel';
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse';


export class ListUsersResponse implements IBaseQueryResponse {
    time: Date
    items: IUser[]
    count: number
    totalCount: number

    constructor(items: IUser[], count: number,totalCount: number) {
        this.time = new Date(),
        this.items = items,
        this.count = count,
        this.totalCount = totalCount
    }

}
