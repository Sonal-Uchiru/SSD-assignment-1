import mongoose, { Schema } from 'mongoose'
import BaseEntitySchema from './Base'
import { IWaterInoutLocation } from '../types/interfaces/models/IWaterInoutLocation'

const WaterInoutLocationSchema: mongoose.Schema = new Schema(
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

const WaterInoutLocation = mongoose.model<IWaterInoutLocation>('WaterInoutLocation', WaterInoutLocationSchema)
export default WaterInoutLocation
