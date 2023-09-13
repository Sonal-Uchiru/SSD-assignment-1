import { Types } from "mongoose"
import CharacterModification from "../../../../../shared/CharacterModification"
import { GetObjectID } from "../../../../../utils/extension/MongooseExtenstion"

export class CreateResearchPaperCommand {
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
