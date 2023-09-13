import { ISubCategory } from '../../../../types/interfaces/models/ISubCategoryModel'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class ListSubCategoriesResponse implements IBaseQueryResponse {
    time: Date
    items: ISubCategory[]
    count: number
    totalCount: number

    constructor(items: ISubCategory[], count: number, totalCount: number) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
