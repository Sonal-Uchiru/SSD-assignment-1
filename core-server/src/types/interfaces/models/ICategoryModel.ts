import { IBase } from './IBaseModel'
import { ISubCategory } from './ISubCategoryModel'

export interface ICategory extends IBase {
    [x: string]: any
    name: string
    iconUrl: string
    subCategories: [ISubCategory]
}


export interface IUserFavouriteCategory extends ICategory {
    isUserfavourite: boolean
}
