import { Types } from 'mongoose'
import { GetObjectID } from '../../../../../utils/extension/MongooseExtenstion'

export class CreateNotificationCommand {
    title: string
    isPreviewed: boolean
    content: Types.ObjectId
    user: Types.ObjectId

    constructor(
        title: string,
        isPreviewed: boolean,
        content: string,
        user: string
    ) {
        this.title = title
        this.isPreviewed = isPreviewed
        this.content = GetObjectID(content)
        this.user = GetObjectID(user)
    }
}
