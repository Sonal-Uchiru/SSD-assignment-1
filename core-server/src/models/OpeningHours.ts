import mongoose, { Schema } from 'mongoose'
import { IOpeningHours } from '../types/interfaces/models/IOpeningHours'
import BaseEntitySchema from './Base'

const OpeningHoursSchema: mongoose.Schema = new Schema(
    {
        openingTime: {
            type: Date,
            required: true,
        },
        closingTime: {
            type: Date,
            min: 3,
            required: true,
        },
        ...BaseEntitySchema.obj,
    },
    { timestamps: true }
)

const OpeningHours = mongoose.model<IOpeningHours>('OpeningHour', OpeningHoursSchema)
export default OpeningHours
