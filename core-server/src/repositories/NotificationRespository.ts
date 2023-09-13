import Notification from '../models/Notification'
import { QueryParams } from '../types/QueryParams'
import { INotification } from '../types/interfaces/models/INotificationModel'
import { CreateNotificationCommand } from '../types/notification/v1/command/create/CreateNotificationCommand'
import { GetObjectID } from '../utils/extension/MongooseExtenstion'

class NotificationRepository {
    async SaveAsync(
        newNotification: CreateNotificationCommand
    ): Promise<INotification> {
        return await new Notification({
            ...newNotification,
        }).save()
    }

    async changePreviewStateByIdAsync(id: string): Promise<INotification> {
        return await Notification.findByIdAndUpdate(id, {
            $set: {
                isPreviewed: true,
            },
        })
    }

    async DeleteAsync(ids: string[]): Promise<number> {
        const filter = { _id: { $in: ids.map((id) => GetObjectID(id)) } }
        const content = await Notification.deleteMany(filter)
        return content.deletedCount
    }

    async AnyAsync(id: string): Promise<INotification> {
        return await Notification.findOne(
            { _id: id, isDeleted: null },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
    }

    async GetListTotalCountByUserAsync(userId: string): Promise<number> {
        return (
            await Notification.find({ isDeleted: null }, { _id: 1 }).where({
                user: GetObjectID(userId),
            })
        ).length
    }

    async GetNotificationById(id: string): Promise<INotification> {
        return await Notification.findOne(
            {
                _id: id,
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
    }

    async GetNotificationListByUser(
        userId: string,
        queries: QueryParams
    ): Promise<INotification[]> {
        return await Notification.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .where({ user: GetObjectID(userId) })
            .populate('content', { topic: 1 })
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })
    }
}

export default new NotificationRepository()
