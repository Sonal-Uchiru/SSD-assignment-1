import { Schema } from 'mongoose'
import { IBase } from './IBaseModel'

export interface INotification extends IBase {
    [x: string]: any
    title: string
    isPreviewed: boolean
    contentId: string
    user: Schema.Types.ObjectId
}
