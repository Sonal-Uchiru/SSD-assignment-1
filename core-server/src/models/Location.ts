import mongoose, { Schema } from 'mongoose'
import BaseEntitySchema from './Base'
import { ILocation } from '../types/interfaces/models/ILocationModel'

const LocationSchema: mongoose.Schema = new Schema(
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

const Location = mongoose.model<ILocation>('Location', LocationSchema)
export default Location
