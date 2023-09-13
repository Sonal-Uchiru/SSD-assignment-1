import mongoose, { Schema } from 'mongoose'
import { ICategory } from '../types/interfaces/models/ICategoryModel'
import BaseEntitySchema from './Base'

const CategorySchema: mongoose.Schema = new Schema(
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
        ...BaseEntitySchema.obj,
    },
    { timestamps: true }
)

const Category = mongoose.model<ICategory>('Category', CategorySchema)
export default Category
