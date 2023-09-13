import { Schema } from 'mongoose'
import { IBase } from './IBaseModel'

export interface IResearchPaper extends IBase {
    [x: string]: any
    mediaFileUrl: string
    topic: string
    summerizedContent: string
    subCategory: Schema.Types.ObjectId
}
