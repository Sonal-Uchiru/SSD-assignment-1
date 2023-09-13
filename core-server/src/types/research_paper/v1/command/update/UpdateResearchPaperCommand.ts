import { GetObjectID } from '../../../../../utils/extension/MongooseExtenstion'
import CharacterModification from '../../../../../shared/CharacterModification'
import { Types } from 'mongoose'

export class UpdateResearchPaperCommand {
    mediaFileUrl: string
    topic: string
    summerizedContent: string
    subCategory: Types.ObjectId

    constructor(
        mediaFileUrl: string,
        topic: string,
        summerizedContent: string,
        subCategory: string
    ) {
        this.mediaFileUrl = mediaFileUrl
        this.topic = CharacterModification.firstCharacterToUpper(topic)
        this.summerizedContent = summerizedContent
        this.subCategory = GetObjectID(subCategory)
    }
}
