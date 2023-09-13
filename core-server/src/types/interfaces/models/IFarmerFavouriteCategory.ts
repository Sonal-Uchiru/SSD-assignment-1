import { Schema } from 'mongoose'
import { IBase } from './IBaseModel'

export interface IFarmerFavouriteCategory extends IBase {
    [x: string]: any
    category: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId
}
