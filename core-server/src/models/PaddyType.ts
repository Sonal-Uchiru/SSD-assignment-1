import mongoose, { Schema } from 'mongoose'
import BaseEntitySchema from './Base'
import { IPaddyType } from '../types/interfaces/models/IPaddyTypeModel'

const PaddyTypeSchema: mongoose.Schema = new Schema(
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

const PaddyType = mongoose.model<IPaddyType>('PaddyType', PaddyTypeSchema)
export default PaddyType
