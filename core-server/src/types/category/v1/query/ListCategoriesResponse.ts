import { ICategory } from '../../../../types/interfaces/models/ICategoryModel'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListCategoriesResponse implements IBaseQueryResponse {
    time: Date
    items: ICategory[]
    count: number
    totalCount: number

    constructor(items: ICategory[], count: number, totalCount: number) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
