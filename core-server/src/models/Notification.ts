import mongoose, { Schema } from 'mongoose'
import { INotification } from '../types/interfaces/models/INotificationModel'
import BaseEntitySchema from './Base'

const NotificationSchema: mongoose.Schema = new Schema(
    {
        title: {
            type: String,
            min: 3,
            max: 255,
            required: true,
        },
        isPreviewed: {
            type: Boolean,
            default: false,
        },
        content: {
            type: Schema.Types.ObjectId,
            ref: 'ResearchPaper'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        ...BaseEntitySchema.obj,
    },
    { timestamps: true }
)

const Notification = mongoose.model<INotification>(
    'Notification',
    NotificationSchema
)
export default Notification
