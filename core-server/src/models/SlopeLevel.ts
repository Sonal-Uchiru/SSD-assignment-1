import mongoose, { Schema } from 'mongoose'
import BaseEntitySchema from './Base'
import { ISlopeLevel } from '../types/interfaces/models/ISlopeLevel'

const SlopeLevelSchema: mongoose.Schema = new Schema(
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

const SlopeLevel = mongoose.model<ISlopeLevel>('SlopeLevel', SlopeLevelSchema)
export default SlopeLevel
