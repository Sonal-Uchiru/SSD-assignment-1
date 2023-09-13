import mongoose, { Schema } from 'mongoose'
import { ISubCategory } from '../types/interfaces/models/ISubCategoryModel'
import BaseEntitySchema from './Base'

const SubCategorySchema: mongoose.Schema = new Schema(
    {
        name: {
            type: String,
            min: 3,
            max: 255,
            required: true,
        },
        iconUrl: {
            type: String,
            min: 3,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        ...BaseEntitySchema.obj,
    },
    { timestamps: true }
)

const SubCategory = mongoose.model<ISubCategory>('SubCategory', SubCategorySchema)
export default SubCategory
