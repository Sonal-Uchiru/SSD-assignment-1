import { BaseListResponse } from './BaseListResponse'

interface IPopulatedContent {
    _id: string
    name: string
}

interface IPaddyField {
    _id: string
    name: string
    location: IPopulatedContent
    paddyType: IPopulatedContent
    slopeLevel: IPopulatedContent
    waterIn: IPopulatedContent
    waterOut: IPopulatedContent
    acres: number
    mapContent: object
    irrigatedMapContent: object
    numberOfIrrigations: number
    spaceBetweenIrrigations: number
    user: string
    createdAt: Date
    updatedAt: Date
}

export class PaddyFieldListResponse extends BaseListResponse {
    constructor(
        time: Date,
        items: IPaddyField[],
        count: number,
        totalCount: number
    ) {
        super(time, items, count, totalCount)
    }
}
