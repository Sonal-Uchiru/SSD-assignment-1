import mongoose, { Schema } from 'mongoose'
import { IAggrerianDivision } from '../types/interfaces/models/IAggrerianDivisionModel'
import BaseEntitySchema from './Base'

const AggrerianDivisionSchema: mongoose.Schema = new Schema(
    {
        name: {
            type: String,
            min: 3,
            max: 255,
            required: true,
        },
        code: {
            type: String,
            min: 3,
            required: true,
        },
        ...BaseEntitySchema.obj,
    },
    { timestamps: true }
)

const AggrerianDivision = mongoose.model<IAggrerianDivision>('AggrerianDivision', AggrerianDivisionSchema)
export default AggrerianDivision
