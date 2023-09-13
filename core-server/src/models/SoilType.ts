import mongoose, { Schema } from 'mongoose'
import BaseEntitySchema from './Base'
import { ISoilType } from '../types/interfaces/models/ISoilTypeModel'

const SoilTypeSchema: mongoose.Schema = new Schema(
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

const SoilType = mongoose.model<ISoilType>('SoilType', SoilTypeSchema)
export default SoilType
