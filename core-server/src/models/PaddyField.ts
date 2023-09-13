import mongoose, { Schema } from 'mongoose'
import { IPaddyField } from '../types/interfaces/models/IPaddyFieldModel'
import BaseEntitySchema from './Base'

const PaddyFieldSchema: mongoose.Schema = new Schema(
    {
        name: {
            type: String,
            min: 3,
            max: 255,
            required: true,
        },
        location: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Location',
        },
        paddyType: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'PaddyType',
        },
        slopeLevel: {
            type: Schema.Types.ObjectId,
            ref: 'SlopeLevel',
        },
        waterIn: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'WaterInoutLocation',
        },
        waterOut: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'WaterInoutLocation',
        },
        acres: {
            type: Number,
            required: true,
        },
        mapContent: {
            type: JSON,
            required: true,
        },
        irrigatedMapContent: {
            type: JSON,
            required: true,
        },
        numberOfIrrigations: {
            type: Number,
            required: true,
        },
        spaceBetweenIrrigations: {
            type: Number,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        ...BaseEntitySchema.obj,
    },
    { timestamps: true }
)

const PaddyField = mongoose.model<IPaddyField>('PaddyField', PaddyFieldSchema)
export default PaddyField
