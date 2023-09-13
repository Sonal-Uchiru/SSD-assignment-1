import mongoose, { Schema } from 'mongoose'
import { IPredictionFeedback } from '../types/interfaces/models/IPredictionFeedbackModel'
import BaseEntitySchema from './Base'

const PredictionFeedbackSchema: mongoose.Schema = new Schema(
    {
        actualHarvestedAmount: {
            type: Number,
            required: true,
        },
        actualKgAmount: {
            type: Number,
            required: true,
        },
        harvestPrediction: {
            type: Schema.Types.ObjectId,
            ref: 'HarvestPrediction',
        },

        ...BaseEntitySchema.obj,
    },
    { timestamps: true }
)

const PredictionFeedback = mongoose.model<IPredictionFeedback>(
    'PredictionFeedback',
    PredictionFeedbackSchema
)
export default PredictionFeedback
