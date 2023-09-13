import { Types } from 'mongoose'
import { GetObjectID } from '../../../../../utils/extension/MongooseExtenstion'

export class CreatePredictionFeedbackCommand {
    actualHarvestedAmount: number
    actualKgAmount: number
    harvestPrediction: Types.ObjectId

    constructor(
        actualHarvestedAmount: number,
        actualKgAmount: number,
        harvestPrediction: string
    ) {
        this.actualHarvestedAmount = actualHarvestedAmount
        this.actualKgAmount = actualKgAmount
        this.harvestPrediction = GetObjectID(harvestPrediction)
    }
}
