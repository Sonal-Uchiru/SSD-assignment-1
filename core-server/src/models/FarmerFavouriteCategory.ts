import mongoose, { Schema } from 'mongoose'
import { IFarmerFavouriteCategory } from '../types/interfaces/models/IFarmerFavouriteCategory'
import BaseEntitySchema from './Base'

const FarmerFavouriteCategorySchema: mongoose.Schema = new Schema(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        ...BaseEntitySchema.obj,
    },
    { timestamps: true }
)

const FarmerFavouriteCategory = mongoose.model<IFarmerFavouriteCategory>(
    'FarmerFavouriteCategory',
    FarmerFavouriteCategorySchema
)
export default FarmerFavouriteCategory
