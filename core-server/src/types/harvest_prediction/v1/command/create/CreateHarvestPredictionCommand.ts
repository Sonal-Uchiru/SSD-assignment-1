import { Types } from 'mongoose'
import { DistrictTypes } from '../../../../../types/enum/harvest_prediction/DistrictTypes'
import { GetObjectID } from '../../../../../utils/extension/MongooseExtenstion'

export class CreateHarvestPredictionCommand {
    harvestAmount: number
    searchDate: Date
    sownAmount: number
    season: string
    district: string
    total: number
    kg: number
    cultivationMethod: Types.ObjectId
    cultivationMonth: Types.ObjectId
    wastageAmount: number
    unitOfLand: string
    soilType: Types.ObjectId
    paddyType: Types.ObjectId
    districtType: DistrictTypes
    divisionalSecretariats: string
    gramaDivision: string
    user: Types.ObjectId

    constructor(
        harvestAmount: number,
        searchDate: Date,
        sownAmount: number,
        season: string,
        district: string,
        total: number,
        kg: number,
        cultivationMethod: string,
        cultivationMonth: string,
        wastageAmount: number,
        unitOfLand: string,
        soilType: string,
        paddyType: string,
        districtType: DistrictTypes,
        divisionalSecretariats: string,
        gramaDivision: string,
        user: string
    ) {
        this.harvestAmount = harvestAmount
        this.searchDate = searchDate
        this.sownAmount = sownAmount
        this.season = season
        this.district = district
        this.total = total
        this.kg = kg
        this.cultivationMethod = GetObjectID(cultivationMethod)
        this.cultivationMonth = GetObjectID(cultivationMonth)
        this.wastageAmount = wastageAmount
        this.unitOfLand = unitOfLand
        this.soilType = GetObjectID(soilType)
        this.paddyType = GetObjectID(paddyType)
        this.districtType = districtType
        this.divisionalSecretariats = divisionalSecretariats
        this.gramaDivision = gramaDivision
        this.user = GetObjectID(user)
    }
}
