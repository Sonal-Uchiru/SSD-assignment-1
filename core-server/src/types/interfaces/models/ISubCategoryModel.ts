import { Schema } from 'mongoose'
import { IBase } from './IBaseModel'

export interface ISubCategory extends IBase {
    [x: string]: any
    name: string
    iconUrl: string
    category: Schema.Types.ObjectId
}
