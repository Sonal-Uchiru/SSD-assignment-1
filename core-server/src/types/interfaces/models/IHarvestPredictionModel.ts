import { Schema } from 'mongoose'
import { DistrictTypes } from '../../../types/enum/harvest_prediction/DistrictTypes'
import { IBase } from './IBaseModel'

export interface IHarvestPrediction extends IBase {
    [x: string]: any
    harvestAmount: number
    searchDate: Date
    sownAmount: number
    season: string
    district: string
    total: number
    kg: number
    cultivationMethod: Schema.Types.ObjectId
    cultivationMonth: Schema.Types.ObjectId
    wastageAmount: number
    unitOfLand: string
    soilType: Schema.Types.ObjectId
    paddyType: Schema.Types.ObjectId
    districtType: DistrictTypes
    divisionalSecretariats: string
    gramaDivision: string
    user: Schema.Types.ObjectId
}
