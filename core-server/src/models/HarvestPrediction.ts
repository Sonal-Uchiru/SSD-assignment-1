import mongoose, { Schema } from 'mongoose'
import { IHarvestPrediction } from '../types/interfaces/models/IHarvestPredictionModel'
import BaseEntitySchema from './Base'

const HarvestPredictionSchema: mongoose.Schema = new Schema(
    {
        harvestAmount: {
            type: Number,
            required: true,
        },
        searchDate: {
            type: Date,
            required: true,
        },
        sownAmount: {
            type: Number,
            required: true,
        },
        season: {
            type: String,
            min: 3,
            max: 255,
            required: true,
        },
        district: {
            type: String,
            min: 3,
            max: 255,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        kg:{
            type: Number,
            required: true,
        },
        cultivationMethod: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'CultivationMethod',
        },
        cultivationMonth: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'CultivationMonth',
        },
        wastageAmount: {
            type: Number,
            required: true,
        },
        unitOfLand: {
            type: String,
            min: 3,
            max: 255,
            required: true,
        },
        soilType: {
            type: Schema.Types.ObjectId,
            ref: 'SoilType',
        },
        paddyType: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'PaddyType',
        },
        districtType: {
            type: Number,
            required: true,
        },
        divisionalSecretariats: {
            type: String,
        },
        gramaDivision: {
            type: String,
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

const HarvestPrediction = mongoose.model<IHarvestPrediction>(
    'HarvestPrediction',
    HarvestPredictionSchema
)
export default HarvestPrediction
