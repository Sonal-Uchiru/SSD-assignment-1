import { IBaseResponse } from './IBaseResponse'

export interface IBaseQueryResponse extends IBaseResponse {
    items: any[]
    count: number
    totalCount: number
}
