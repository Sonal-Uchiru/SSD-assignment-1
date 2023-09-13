import { Schema } from 'mongoose'
import { IBase } from './IBaseModel'

export interface IPaddyField extends IBase {
    [x: string]: any
    name: string
    location: Schema.Types.ObjectId
    paddyType: Schema.Types.ObjectId
    slopeLevel: Schema.Types.ObjectId
    waterIn: Schema.Types.ObjectId
    waterOut: Schema.Types.ObjectId
    acres: number
    mapContent: JSON
    irrigatedMapContent: JSON
    numberOfIrrigations: number
    spaceBetweenIrrigations: number
    user: Schema.Types.ObjectId
}
