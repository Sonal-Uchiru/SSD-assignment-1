import { Types } from "mongoose"
import CharacterModification from "../../../../../shared/CharacterModification"
import { GetObjectID } from "../../../../../utils/extension/MongooseExtenstion"

export class CreatePaddyFieldCommand {
    name: string
    location: Types.ObjectId
    paddyType: Types.ObjectId
    slopeLevel: Types.ObjectId
    waterIn: Types.ObjectId
    waterOut: Types.ObjectId
    acres: number
    mapContent: any
    irrigatedMapContent: any
    numberOfIrrigations: number
    spaceBetweenIrrigations: number
    user: Types.ObjectId

    constructor(
    name: string,
    location: string,
    paddyType: string,
    slopeLevel: string,
    waterIn: string,
    waterOut: string,
    acres: number,
    mapContent: any,
    irrigatedMapContent: any,
    numberOfIrrigations: number,
    spaceBetweenIrrigations: number,
    user: string
    ) {
       this.name = CharacterModification.firstCharacterToUpper(name)
       this.location = GetObjectID(location)
       this.paddyType = GetObjectID(paddyType)
       this.slopeLevel = GetObjectID(slopeLevel)
       this.waterIn = GetObjectID(waterIn)
       this.waterOut = GetObjectID(waterOut)
       this.acres = acres
       this.mapContent = mapContent
       this.irrigatedMapContent = irrigatedMapContent
       this.numberOfIrrigations = numberOfIrrigations
       this.spaceBetweenIrrigations = spaceBetweenIrrigations
       this.user = GetObjectID(user)
    }
}
