import { Schema } from 'mongoose'
import { IBase } from './IBaseModel'

export interface IPredictionFeedback extends IBase {
    [x: string]: any
    actualHarvestedAmount: number
    actualKgAmount: number
    harvestPrediction: Schema.Types.ObjectId
}
