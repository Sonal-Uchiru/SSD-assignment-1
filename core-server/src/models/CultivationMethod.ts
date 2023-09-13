import mongoose, { Schema } from 'mongoose'
import BaseEntitySchema from './Base'
import { ICultivationMethod } from '../types/interfaces/models/ICultivationMethodModel'

const CultivationMethodSchema: mongoose.Schema = new Schema(
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

const CultivationMethod = mongoose.model<ICultivationMethod>('CultivationMethod', CultivationMethodSchema)
export default CultivationMethod
