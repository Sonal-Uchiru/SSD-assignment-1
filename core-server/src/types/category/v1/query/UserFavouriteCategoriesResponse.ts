import { IFarmerFavouriteCategory } from '../../../../types/interfaces/models/IFarmerFavouriteCategory'
import { IBaseQueryResponse } from '../../../interfaces/IBaseQueryResponse'

export class UserFavouriteCategoriesResponse implements IBaseQueryResponse {
    time: Date
    items: IFarmerFavouriteCategory[]
    count: number
    totalCount: number

    constructor(items: IFarmerFavouriteCategory[], count: number, totalCount: number) {
        ;(this.time = new Date()),
            (this.items = items),
            (this.count = count),
            (this.totalCount = totalCount)
    }
}
