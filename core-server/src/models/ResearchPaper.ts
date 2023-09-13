import mongoose, { Schema } from 'mongoose'
import { IResearchPaper } from '../types/interfaces/models/IResearchPaperModel'
import BaseEntitySchema from './Base'

const ResearchPaperSchema: mongoose.Schema = new Schema(
    {
        mediaFileUrl: {
            type: String,
            min: 3,
            required: true,
        },
        topic: {
            type: String,
            min: 3,
            max: 255,
            required: true,
        },
        summerizedContent: {
            type: String,
            required: true,
        },
        subCategory: {
            type: Schema.Types.ObjectId,
            ref: 'SubCategory',
        },
        ...BaseEntitySchema.obj,
    },
    { timestamps: true }
)

const ResearchPaper = mongoose.model<IResearchPaper>(
    'ResearchPaper',
    ResearchPaperSchema
)
export default ResearchPaper
