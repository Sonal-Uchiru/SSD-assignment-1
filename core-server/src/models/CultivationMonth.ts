import mongoose, { Schema } from 'mongoose'
import BaseEntitySchema from './Base'
import { ICultivationMonth } from '../types/interfaces/models/ICultivationMonthModel'

const CultivationMonthSchema: mongoose.Schema = new Schema(
    {
        name: {
            type: String,
            min: 3,
            max: 255,
            required: true,
        },
        ...BaseEntitySchema.obj,
    },
    { timestamps: true }
)

const CultivationMonth = mongoose.model<ICultivationMonth>('CultivationMonth', CultivationMonthSchema)
export default CultivationMonth
